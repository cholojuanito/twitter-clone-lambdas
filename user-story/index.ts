import { DynamoDB } from 'aws-sdk';
import { Context } from 'aws-lambda';
import TweetCollectionResponse from "./TweetCollectionResponse";
import TweetCollectionFeedStoryGetRequest from "./TweetCollectionFeedStoryRequest";
import Tweet from "./Tweet";
import { Media, MediaType } from "./Media";
import Hashtag from "./Hashtag";
import Mention from "./Mention";
import { ErrorResponse } from "./ErrorResponse";
import ExternalURL from "./ExternalURL";

export const handler = async (event: TweetCollectionFeedStoryGetRequest, context:Context): Promise<TweetCollectionResponse> => {

    console.log('Entering user-story')


    let docClient = new DynamoDB.DocumentClient();
    let params:DynamoDB.DocumentClient.QueryInput = {
        TableName: 'Tweets',
        KeyConditionExpression: '#uid = :uid',
        ScanIndexForward: false, // Descending order
        ExpressionAttributeNames: {
            '#uid': 'authorId'
        },
        ExpressionAttributeValues: {
            ':uid': event.userId
        },
        Limit: event.pageSize,
    };

    if (event.lastKey != null && event.lastKey !== '') {
        params.ExclusiveStartKey = event.lastKey;
    }

    let result = await docClient.query(params, (err, data) => {
        if (err) {
            console.error("Unable to get user story. Error JSON:", JSON.stringify(err));
            let resp:ErrorResponse = new ErrorResponse(err.message, err.statusCode);
            context.fail(JSON.stringify(resp));
        } else {
            console.log("Got item:", JSON.stringify(data));
        }
    }).promise();

    let t:Tweet[] = [];
    if (result.Count > 0) {
        for (let idx = 0; idx < result.Items.length; idx++) {
            let data = result.Items[idx];
            let hashtags:Hashtag[] = data.hashtags.map((word:string) => new Hashtag(word, [data.id]));
            let mentions:Mention[] = data.mentions.map((word:string) => new Mention(word, word));
            let urls:ExternalURL[] = data.urls.map((word:string) => new ExternalURL(word));
            t.push(new Tweet(data.id, data.authorId, data.message, new Media(data.media, data.mediaType), hashtags, mentions, urls, data.created));
        }
    }
    else {
        console.error("Unable to get user story");
        // ? Error response?
    }

    console.log('Leaving user-story');

    return new TweetCollectionResponse(t, event.pageSize, result.LastEvaluatedKey);

}