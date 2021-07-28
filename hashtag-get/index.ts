import { DynamoDB } from 'aws-sdk';
import { Context } from 'aws-lambda';
import HashtagResponse from "./HashtagResponse";
import HashtagGetRequest from "./HashtagGetRequest";
import Hashtag from "./Hashtag";
import { ErrorResponse } from './ErrorResponse';


export const handler = async (event: HashtagGetRequest, context:Context): Promise<HashtagResponse> => {

    console.log('Entering hashtag-get');

    let docClient = new DynamoDB.DocumentClient();

    let params:DynamoDB.DocumentClient.GetItemInput = {
        TableName: 'Hashtags',
        Key: {
            'word': event.word,
        },
    };

    let result = await docClient.get(params, (err, data) => {
        if (err || !data.Item) {
            console.error("Unable to get hashtag. Error JSON:", JSON.stringify(err));
            let resp:ErrorResponse = new ErrorResponse('No user with that alias was found', 400);
            context.fail(JSON.stringify(resp));
        } else {
            console.log("Got item:", JSON.stringify(data));
        }
    }).promise();

    let h:Hashtag = null;

    if (result.Item) {
        let data = result.Item;
        h = new Hashtag(data.word, data.tweetIds);
    }
    else {
        console.error("Unable to get hashtag.");
        // ? Error response?
    }

    console.log('Leaving hashtag-get');

    return new HashtagResponse(h);

}