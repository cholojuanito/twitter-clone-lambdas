import { DynamoDB } from 'aws-sdk';
import { Context } from 'aws-lambda';
import { UserUpdateRequest, UserUpdateAction, UserUpdates } from "./UserUpdateRequest";
import UserResponse from "./UserResponse";
import User from "./User";
import { Media, MediaType } from "./Media";
import { ErrorResponse } from './ErrorResponse';


export const handler = async (event: UserUpdateRequest, context:Context): Promise<UserResponse> => {

    console.log('Entering user-update');

    let u:User = null;
    let docClient = new DynamoDB.DocumentClient();
    let params:DynamoDB.DocumentClient.UpdateItemInput = {
        TableName: 'Users',
        Key: {
            'alias': event.alias
        },
        UpdateExpression: 'SET #v = :v',
        ConditionExpression: 'attribute_exists(alias)',
        ExpressionAttributeNames: {
            '#v': 'profilePic'
        },
        ExpressionAttributeValues: {
            ':v': event.value.profilePicPath,
        },
        ReturnValues: 'ALL_NEW'
    };
    
    if (event.action == UserUpdateAction.Replace) {

        let result = await docClient.update(params, (err, data) => {
            if (err) {
                console.error("Unable to update user. Error JSON:", JSON.stringify(err));
                let resp:ErrorResponse = new ErrorResponse('No user with that alias was found', 400);
                context.fail(JSON.stringify(resp));
            } else {
                console.log("Got item:", JSON.stringify(data));
            }
        }).promise();

        let data = result.Attributes;
        u = new User(data['id'], data['alias'], data['name'], new Media(data['profilePic'], MediaType.Image), data['created']);
    }
    else {
        console.error(`Unsupported update action: ${event.action}`);
        let errResp = new ErrorResponse(`Unsupported update action: ${event.action}`, 400);
        context.fail(JSON.stringify(errResp));
    }

    console.log('Leaving user-update');

    return new UserResponse(u);

}