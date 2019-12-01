import { DynamoDB } from 'aws-sdk';
import { Context } from 'aws-lambda';
import { HashtagUpdateRequest, HashtagUpdateAction, HashtagUpdates } from "./HashtagUpdateRequest";
import HashtagResponse from "./HashtagResponse";
import Hashtag from "./Hashtag";
import { ErrorResponse } from './ErrorResponse';


export const handler = async (event: HashtagUpdateRequest, context:Context): Promise<HashtagResponse> => {

    console.log('Entering hashtag-update');

    let h:Hashtag = null;
    let docClient = new DynamoDB.DocumentClient();
    
    if (event.action == HashtagUpdateAction.Add) {

        let params:DynamoDB.DocumentClient.UpdateItemInput = {
            TableName: 'Hashtags',
            Key: {
                'word': event.word
            },
            UpdateExpression: 'ADD #v :v',
            ConditionExpression: 'attribute_exists(word)',
            ExpressionAttributeNames: {
                '#v': 'tweetIds'
            },
            ExpressionAttributeValues: {
                ':v': docClient.createSet([event.value.tweetId])
            },
            ReturnValues: 'ALL_NEW'
        };

        let result = await docClient.update(params, (err, data) => {
            if (err) {
                console.error("Unable to add tweet to hashtag list. Error JSON:", JSON.stringify(err));
                let resp:ErrorResponse = null;
                if (err.code = 'ConditionalCheckFailedException') {
                    resp = new ErrorResponse('Not exists error. That hashtag does not exist', err.statusCode);
                }
                else {
                    resp = new ErrorResponse('Unable to add tweet to hashtag list', 400);
                }
                context.fail(JSON.stringify(resp));
            } else {
                console.log("Got item:", JSON.stringify(data));
            }
        }).promise();

        let data = result.Attributes;
        h = new Hashtag(event.word, data['tweetIds']);
    }
    else if (HashtagUpdateAction.Remove) {
        let params:DynamoDB.DocumentClient.UpdateItemInput = {
            TableName: 'Hashtags',
            Key: {
                'word': event.word
            },
            UpdateExpression: 'DELETE #v :v',
            ConditionExpression: 'attribute_exists(word)',
            ExpressionAttributeNames: {
                '#v': 'tweetIds'
            },
            ExpressionAttributeValues: {
                ':v': docClient.createSet([event.value.tweetId])
            },
            ReturnValues: 'ALL_NEW'
        };
        
        let result = await docClient.update(params, (err, data) => {
            if (err) {
                console.error("Unable to remove tweet from hashtag list. Error JSON:", JSON.stringify(err));
                let resp:ErrorResponse = null;
                if (err.code = 'ConditionalCheckFailedException') {
                    resp = new ErrorResponse('Not exists error. That hashtag does not exist', err.statusCode);
                }
                else {
                    resp = new ErrorResponse('Unable to remove tweet from hashtag list', 400);
                }
                context.fail(JSON.stringify(resp));
            } else {
                console.log("Got item:", JSON.stringify(data));
            }
        }).promise();

        let data = result.Attributes;
        h = new Hashtag(event.word, data['tweetIds']);
    }
    else {
        console.error(`Unsupported update action: ${event.action}`);
        let errResp = new ErrorResponse(`Unsupported update action: ${event.action}`, 400);
        context.fail(JSON.stringify(errResp));
    }

    console.log('Leaving hashtag-update');

    return new HashtagResponse(h);

}