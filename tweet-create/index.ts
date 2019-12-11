import { v4 } from 'uuid';
import { DynamoDB, SQS } from 'aws-sdk';
import { Context, Callback } from 'aws-lambda'
import TweetCreateRequest from "./TweetCreateRequest";
import TweetResponse from "./TweetResponse";
import Tweet from "./Tweet";
import { ErrorResponse } from './ErrorResponse';

export const handler = async (event: TweetCreateRequest, context:Context): Promise<TweetResponse> => {

    console.log('Entering tweet-create')

    let id = 't_' + v4();
    let docClient = new DynamoDB.DocumentClient();
    let timestamp = Math.floor(new Date().getTime() / 1000);
    let media = null;
    let mediaType = null;
    if (event.media != null) {
        media = event.media.path;
        mediaType = event.media.type;
    }
    let hashtags:string[] = event.hashtags.map((tag) =>  tag.word);
    let mentions:string[] = event.mentions.map((m) => m.alias);
    let urls:string[] = event.urls.map((u) => u.route);

    let tweetParams:DynamoDB.DocumentClient.PutItemInput = {
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

    let readFollowersQueueURL = 'https://sqs.us-west-1.amazonaws.com/051836640884/read-followers';

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

    // Send to queue to be added to all other follower's feeds
    let sqs = new SQS({ apiVersion: "2012-11-05", region: "us-west-1" });
    let queueParams:SQS.SendMessageRequest = {
            MessageBody: `${event.authorId}:${timestamp}`,
            QueueUrl: readFollowersQueueURL,
            DelaySeconds: 2
    };
    sqs.sendMessage(queueParams, (err: AWS.AWSError, data: SQS.Types.SendMessageResult) => {
        if (err) {
            console.log("Error sending to read-followers queue", err);
        }
    
        else {
            console.log("Success", data.MessageId);
        }
    
    });
    

    let hashtagParams:DynamoDB.DocumentClient.PutItemInput = null;
    // ?set up queues and params for hashtags as well
    // Add hashtags to hashtag table    
    for (let idx = 0; idx < hashtags.length; idx++) {
        const element = hashtags[idx];
        hashtagParams = {
            TableName: 'Hashtags',
            Item: {
                word: element,
                created: timestamp,
                tweetKey: {
                    'authorId': event.authorId,
                    'created': timestamp
                }
            }
        };

        let hashtagResult = await docClient.put(hashtagParams, (err, data) => {
            if (err) {
                console.error("Unable to add hashtag. Error JSON:", JSON.stringify(err));
                let resp = new ErrorResponse(err.message, err.statusCode);
                context.fail(JSON.stringify(resp));
            } else {
                console.log("Added hashtag");
            }
        }).promise();
    }

    let t:Tweet = new Tweet(id, event.authorId, event.message, event.media, event.hashtags, event.mentions, event.urls, timestamp);

    console.log('Leaving tweet-create');

    return new TweetResponse(t);

}