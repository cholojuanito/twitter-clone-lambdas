import { DynamoDB } from 'aws-sdk';
import { Context } from 'aws-lambda';
import Follow from "./Follow";
import FollowGetRequest from "./FollowGetRequest";
import FollowResponse from "./FollowResponse";
import { ErrorResponse } from './ErrorResponse';


export const handler = async (event: FollowGetRequest, context:Context): Promise<FollowResponse> => {

    console.log('Entering follow-get')

    let docClient = new DynamoDB.DocumentClient();

    let params:DynamoDB.DocumentClient.QueryInput = {
        TableName: 'Follows',
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
            console.error("Unable to get follow by id. Error JSON:", JSON.stringify(err));
            let resp:ErrorResponse = new ErrorResponse(err.message, err.statusCode);
            context.fail(JSON.stringify(resp));
        } else {
            console.log("Got item:", JSON.stringify(data));
        }
    }).promise();

    let f:Follow = null;
    if (result.Count > 0) {
        let data = result.Items[0];
        f = new Follow(data.id, data.followerId, data.followeeId, data.isActive, data.startDate);
    }
    else {
        console.error("Unable to get follow by id.");
    }

    console.log('Leaving follow-get');

    return new FollowResponse(f);

}