import { DynamoDB } from 'aws-sdk';
import { Context, Callback } from 'aws-lambda';
import { v4 } from 'uuid';
import FollowCreateRequest from "./FollowCreateRequest";
import FollowResponse from "./FollowResponse";
import Follow from "./Follow";
import { ErrorResponse } from './ErrorResponse';

export const handler = async (event: FollowCreateRequest, context:Context): Promise<FollowResponse> => {

    console.log('Entering follow-create')

    let id = 'f_' + v4();
    let startDate = new Date().toISOString();
    let docClient = new DynamoDB.DocumentClient();
    let params: DynamoDB.DocumentClient.PutItemInput = {
        TableName: 'Follows',
        Item: {
            id: id,
            followerId: event.followerId,
            followeeId: event.followeeId,
            isActive: true,
            startDate: startDate
        },
        ConditionExpression: 'attribute_not_exists(followerId) and attribute_not_exists(followeeId)'
    };

    let result = await docClient.put(params, (err, data) => {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err));
            let resp:ErrorResponse;
            if (err.code = 'ConditionalCheckFailedException') {
                resp = new ErrorResponse('Duplication error. This user is already following the other user', err.statusCode);
            }
            else {
                resp = new ErrorResponse(err.message, err.statusCode);
            }
            context.fail(JSON.stringify(resp));
        } else {
            console.log("Added item:", JSON.stringify(data));
        }
    }).promise();

    let f = new Follow(id, event.followerId, event.followeeId, true, startDate);

    console.log(`created follow with id ${f.id}`);

    console.log('Leaving follow-create');

    return new FollowResponse(f);

}