import { DynamoDB } from 'aws-sdk';
import { Context } from 'aws-lambda';
import Follow from "./Follow";
import FollowExistsRequest from "./FollowExistsRequest";
import FollowResponse from "./FollowResponse";
import { ErrorResponse } from './ErrorResponse';


export const handler = async (event: FollowExistsRequest, context:Context): Promise<FollowResponse> => {

    console.log('Entering follow-exists')

    let docClient = new DynamoDB.DocumentClient();

    let params:DynamoDB.DocumentClient.GetItemInput = {
        TableName: 'Follows',
        Key: {
            'followerId': event.followerId,
            'followeeId': event.followeeId,
        },
    };
    
    let result = await docClient.get(params, (err, data) => {
        if (err || !data.Item) {
            console.error("Unable to get user by alias. Error JSON:", JSON.stringify(err));
            let resp:ErrorResponse = new ErrorResponse('No follow was found', 400);
            context.fail(JSON.stringify(resp));
        } else {
            console.log("Got item:", JSON.stringify(data));
        }
    }).promise();

    let f:Follow = null;
    if (result.Item) {
        let data = result.Item;
        f = new Follow(data.id, data.followerId, data.followeeId, data.isActive, data.startDate);
    }
    else {
        console.error("Unable to get follow by id.");
        // ? Error response?
    }

    console.log('Leaving follow-exists');

    return new FollowResponse(f);

}