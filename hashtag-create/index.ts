import { DynamoDB } from 'aws-sdk';
import { Context } from 'aws-lambda';
import Hashtag from "./Hashtag";
import HashtagCreateRequest from "./HashtagCreateRequest";
import HashtagResponse from "./HashtagResponse";
import { ErrorResponse } from './ErrorResponse';

export const handler = async (event: HashtagCreateRequest, context:Context): Promise<HashtagResponse> => {

    console.log('Entering hashtag-create')

    let docClient = new DynamoDB.DocumentClient();
    let params: DynamoDB.DocumentClient.PutItemInput = {
        TableName: 'Hashtags',
        Item: {
            word: event.word,
            tweetIds: docClient.createSet([event.tweetId]),
        },
        ConditionExpression: 'attribute_not_exists(word)'        
    };


    let result = await docClient.put(params, (err, data) => {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err));
            let resp:ErrorResponse;
            if (err.code = 'ConditionalCheckFailedException') {
                resp = new ErrorResponse('Duplication error. That word is already tracked', err.statusCode);
            }
            else {
                resp = new ErrorResponse(err.message, err.statusCode);
            }
            context.fail(JSON.stringify(resp));
        } else {
            console.log("Added item:", JSON.stringify(data));
        }
    }).promise();

    let h:Hashtag = new Hashtag(event.word, [event.tweetId]);


    console.log('Leaving hashtag-create');

    return new HashtagResponse(h);

}