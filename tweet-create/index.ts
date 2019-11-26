import { v4 } from 'uuid';
import { DynamoDB } from 'aws-sdk';
import { Context, Callback } from 'aws-lambda'
import TweetCreateRequest from "./TweetCreateRequest";
import TweetResponse from "./TweetResponse";
import Tweet from "./Tweet";
import { ErrorResponse } from './ErrorResponse';

export const handler = async (event: TweetCreateRequest, context:Context): Promise<TweetResponse> => {

    console.log('Entering tweet-create')

    let id = 't_' + v4();
    let docClient = new DynamoDB.DocumentClient();
    let date = new Date();
    let creation:string = date.toISOString();
    let timestamp = Math.floor(date.getTime() / 1000);
    let media = null;
    let mediaType = null;
    if (event.media != null) {
        media = event.media.path;
        mediaType = event.media.type;
    }
    let hashtags:string[] = event.hashtags.map((tag) =>  tag.word);
    let mentions:string[] = event.mentions.map((m) => m.alias);
    let urls:string[] = event.urls.map((u) => u.route);

    let tweetParams: DynamoDB.DocumentClient.PutItemInput = {
        TableName: 'Tweets',
        Item: {
            id: id,
            authorId: event.authorId,
            message: event.message,
            media: media,
            mediaType: mediaType,
            hashtags: hashtags,
            mentions: mentions,
            urls: urls,
            created: timestamp
        },     
    };

    let feedParams: DynamoDB.DocumentClient.PutItemInput = {
        TableName: 'Feeds',
        Item: {
            userId: '0miJZZ9DdhQWOnRguB4MCvfe0KV2', // TODO this needs to be changed
            created: timestamp,
            tweetKey: {
                'authorId': event.authorId,
                'created': timestamp
            }
        }       
    };

    // TODO set up queues and params for hashtags as well

    let result = await docClient.put(tweetParams, (err, data) => {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err));
            let resp:ErrorResponse;
            if (err.code = 'ConditionalCheckFailedException') {
                resp = new ErrorResponse('Duplication error. There is already a tweet with that id', err.statusCode);
            }
            else {
                resp = new ErrorResponse(err.message, err.statusCode);
            }
            context.fail(JSON.stringify(resp));
        } else {
            console.log("Added tweet");
        }
    }).promise();

    // Add to the Feed table
    // TODO put in a queue for processing
    let feedResult = await docClient.put(feedParams, (err, data) => {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err));
            let resp = new ErrorResponse(err.message, err.statusCode);
            context.fail(JSON.stringify(resp));
        } else {
            console.log("Added tweet to feed");
        }
    }).promise();

    let t:Tweet = new Tweet(id, event.authorId, event.message, event.media, event.hashtags, event.mentions, event.urls, timestamp.toString());

    console.log('Leaving tweet-create');

    return new TweetResponse(t);

}