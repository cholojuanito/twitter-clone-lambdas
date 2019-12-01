import { DynamoDB } from 'aws-sdk';
import { Context } from 'aws-lambda';
import TweetCollectionByHashtagGetRequest from "./TweetCollectionByHashtagRequest";
import TweetCollectionResponse from "./TweetCollectionResponse";
import Tweet from "./Tweet";
import { ErrorResponse } from "./ErrorResponse";
import { Media, MediaType } from "./Media";
import Hashtag from "./Hashtag";
import Mention from "./Mention";
import ExternalURL from './ExternalURL';

export const handler = async (event: TweetCollectionByHashtagGetRequest, context:Context): Promise<TweetCollectionResponse> => {

    console.log('Entering get-tweets-by-hashtag');
    
    let t:Tweet[] = [];
    let docClient = new DynamoDB.DocumentClient();
    let hashtagParams:DynamoDB.DocumentClient.QueryInput = {
        TableName: 'Hashtags',
        KeyConditionExpression: '#uid = :uid AND #c <= :c',
        ScanIndexForward: false, // Descending order
        ExpressionAttributeNames: {
            '#uid': 'word',
            '#c': 'created'
        },
        ExpressionAttributeValues: {
            ':uid': event.hashtag,
            ':c': Math.floor(new Date().getTime()/1000),
        },
        Limit: event.pageSize,
    };

    if (event.lastKey != null && event.lastKey !== '') {
        hashtagParams.ExclusiveStartKey = event.lastKey;
    }

    let hashtagResult = await docClient.query(hashtagParams, (err, data) => {
        if (err) {
            console.error("Unable to get hashtag. Error JSON:", JSON.stringify(err));
            let resp:ErrorResponse = new ErrorResponse('Unable to get hashtag.', 400);
            context.fail(JSON.stringify(resp));
        } else {
            console.log("Got items:", JSON.stringify(data));
        }
    }).promise();

    let keys:DynamoDB.DocumentClient.Key[] = [];
    if (hashtagResult.Count > 0) {
        for (let i = 0; i < hashtagResult.Items.length; i++) {
            keys.push(hashtagResult.Items[i].tweetKey);
        }
    }
    else {
        return new TweetCollectionResponse(t, event.pageSize, null);
    }

    let tweetParams:DynamoDB.DocumentClient.BatchGetItemInput = {
        RequestItems: {
            'Tweets': {
                'ConsistentRead': true,
                'Keys': keys
            }
        },
    };

    let tweetResult = await docClient.batchGet(tweetParams, (err, data) => {
        if (err) {
            console.error("Unable to get tweets for hashtag. Error JSON:", JSON.stringify(err));
            let resp:ErrorResponse = new ErrorResponse(err.message, err.statusCode);
            context.fail(JSON.stringify(resp));
        } else {
            console.log("Got items:", JSON.stringify(data));
        }
    }).promise();

    let tweets = tweetResult.Responses['Tweets'];
    if (tweets != null) {
        for (let idx = 0; idx < tweets.length; idx++) {
            let data = tweets[idx];
            let hashtags:Hashtag[] = data.hashtags.map((word:string) => new Hashtag(word, [data.id]));
            let mentions:Mention[] = data.mentions.map((word:string) => new Mention(word, word));
            let urls:ExternalURL[] = data.urls.map((word:string) => new ExternalURL(word));
            t.push(new Tweet(data.id, data.authorId, data.message, new Media(data.media, data.mediaType), hashtags, mentions, urls, data.created));
        }
    }
    else {
        console.error("Unable to get user feed");
        // ? Error response?
    }

    console.log('Leaving get-tweets-by-hashtag');

    return new TweetCollectionResponse(t, event.pageSize, hashtagResult.LastEvaluatedKey);

}