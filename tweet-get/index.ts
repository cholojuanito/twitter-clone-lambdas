import { DynamoDB } from 'aws-sdk';
import { Context } from 'aws-lambda';
import TweetGetRequest from "./TweetGetRequest";
import TweetResponse from "./TweetResponse";
import Tweet from "./Tweet";
import Hashtag from "./Hashtag";
import Mention from "./Mention";
import { Media, MediaType } from "./Media";
import ExternalURL from './ExternalURL';
import { ErrorResponse } from './ErrorResponse';

export const handler = async (event: TweetGetRequest, context:Context): Promise<TweetResponse> => {

    console.log('Entering tweet-get');

    let docClient = new DynamoDB.DocumentClient();

    let params:DynamoDB.DocumentClient.QueryInput = {
        TableName: 'Tweets',
        IndexName: 'id-index',
        KeyConditionExpression: '#uid = :uid',
        ExpressionAttributeNames: {
            '#uid': 'id'
        },
        ExpressionAttributeValues: {
            ':uid': event.id
        },
        Limit: 1
        
        
    };

    let result = await docClient.query(params, (err, data) => {
        if (err) {
            console.error("Unable to get user by id. Error JSON:", JSON.stringify(err));
            let resp:ErrorResponse = new ErrorResponse(err.message, err.statusCode);
            context.fail(JSON.stringify(resp));
        } else {
            console.log("Got item:", JSON.stringify(data));
        }
    }).promise();

    let t: Tweet = null;
    if (result.Count > 0) {
        let data = result.Items[0];
        let hashtags:Hashtag[] = data.hashtags.map((word:string) => new Hashtag(word, [data.id]));
        let mentions:Mention[] = data.mentions.map((word:string) => new Mention(word, word));
        let urls:ExternalURL[] = data.urls.map((word:string) => new ExternalURL(word));
        let media:Media = data.media;
        if (media != null) {
            media = new Media(data.media, data.mediaType);
        }
        t = new Tweet(data.id, data.authorId, data.message, media, hashtags, mentions, urls, data.created);
    }
    else {
        console.error("Unable to get tweet by id.");
        // ? Error response?
    }
    

    console.log('Leaving tweet-get');

    return new TweetResponse(t);

}