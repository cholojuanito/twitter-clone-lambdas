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
    let creation:string = new Date().toISOString();
    let hashtags:string[] = event.hashtags.map((tag) =>  tag.word);
    let mentions:string[] = event.mentions.map((m) => m.alias);
    let urls:string[] = event.urls.map((u) => u.route);

    let params: DynamoDB.DocumentClient.PutItemInput = {
        TableName: 'Tweets',
        Item: {
            id: id,
            authorId: event.authorId,
            message: event.message,
            media: event.media.path,
            mediaType: event.media.type,
            hashtags: hashtags,
            mentions: mentions,
            urls: urls,
            created: creation
        },
        ConditionExpression: 'attribute_not_exists(id)'        
    };

    let result = await docClient.put(params, (err, data) => {
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
            console.log("Added item:", JSON.stringify(data));
        }
    }).promise();

    let t:Tweet = new Tweet(id, event.authorId, event.message, event.media, event.hashtags, event.mentions, event.urls, creation);

    console.log('Leaving tweet-create');

    return new TweetResponse(t);

}