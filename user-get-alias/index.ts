import { DynamoDB } from 'aws-sdk';
import { Context } from 'aws-lambda';
import { ErrorResponse } from './ErrorResponse';
import UserGetAliasRequest from "./UserGetAliasRequest";
import UserResponse from "./UserResponse";
import User from "./User";
import { Media, MediaType } from "./Media";

export const handler = async (event: UserGetAliasRequest, context:Context): Promise<UserResponse> => {

    console.log('Entering user-get-alias')

    let docClient = new DynamoDB.DocumentClient();

    let params:DynamoDB.DocumentClient.GetItemInput = {
        TableName: 'Users',
        Key: {
            'alias': event.alias,
        },
    };

    let result = await docClient.get(params, (err, data) => {
        if (err || !data.Item) {
            console.error("Unable to get user by alias. Error JSON:", JSON.stringify(err));
            let resp:ErrorResponse = new ErrorResponse('No user with that alias was found', 400);
            context.fail(JSON.stringify(resp));
        } else {
            console.log("Got item:", JSON.stringify(data));
        }
    }).promise();

    let u: User = null;
    if (result.Item) {
        let data = result.Item;
        u = new User(data.id, data.alias, data.name, new Media(data.profilePic, MediaType.Image), data.created);
    }
    else {
        console.error("Unable to get user by alias.");
        // ? Error response?
    }

    console.log('Leaving user-get-alias');

    return new UserResponse(u);

}