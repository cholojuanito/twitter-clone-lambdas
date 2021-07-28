import { DynamoDB } from 'aws-sdk';
import { Context } from 'aws-lambda';
import { FollowUpdateRequest, FollowUpdates, FollowUpdateAction } from "./FollowUpdateRequest";
import FollowResponse from "./FollowResponse";
import Follow from "./Follow";
import { ErrorResponse } from './ErrorResponse';



export const handler = async (event: FollowUpdateRequest, context:Context): Promise<FollowResponse> => {

    console.log('Entering follow-update')
    let f:Follow = null;

    let docClient = new DynamoDB.DocumentClient();
    let params:DynamoDB.DocumentClient.UpdateItemInput = {
        TableName: 'Follows',
        Key: {
            'followerId': event.followerId,
            'followeeId': event.followeeId,
        },
        UpdateExpression: 'SET #v = :v',
        ConditionExpression: 'attribute_exists(followerId) and attribute_exists(followeeId)',
        ExpressionAttributeNames: {
            '#v': 'isActive'
        },
        ExpressionAttributeValues: {
            ':v': event.value.isActive,
        },
        ReturnValues: 'ALL_NEW'
    };
    
    if (event.action == FollowUpdateAction.Follow || event.action == FollowUpdateAction.Unfollow) {
        let result = await docClient.update(params, (err, data) => {
            if (err) {
                console.error("Unable to update user. Error JSON:", JSON.stringify(err));
                let resp:ErrorResponse = new ErrorResponse('That follow does not exist', 400);
                context.fail(JSON.stringify(resp));
            } else {
                console.log("Updated item:", JSON.stringify(data));
            }
        }).promise();

        let data = result.Attributes;
        f = new Follow(data['id'], data['followerId'], data['followeeId'], data['isActive'], data['startDate']);
        
    }
    else {
        console.error(`Unsupported update action: ${event.action}`);
        let errResp = new ErrorResponse(`Unsupported update action: ${event.action}`, 400);
        context.fail(JSON.stringify(errResp));
    }

    

    console.log('Leaving follow-update');

    return new FollowResponse(f);

}