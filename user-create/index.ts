import { DynamoDB } from 'aws-sdk';
import { Context, Callback } from 'aws-lambda';
import UserCreateRequest from "./UserCreateRequest";
import UserResponse from "./UserResponse";
import User from "./User";
// import { Media, MediaType } from './Media';
import { ErrorResponse } from './ErrorResponse';

export const handler = async (event: UserCreateRequest, context:Context): Promise<UserResponse> => {

    console.log('Entering user-create')

    let docClient = new DynamoDB.DocumentClient();
    let creation = Math.floor(new Date().getTime() / 1000);

    let params: DynamoDB.DocumentClient.PutItemInput = {
        TableName: 'Users',
        Item: {
            id: event.id,
            name: event.name,
            alias: event.alias,
            profilePic: event.profilePic.path,
            created: creation
        },
        ConditionExpression: 'attribute_not_exists(alias)'        
    };


    let result = await docClient.put(params, (err, data) => {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err));
            let resp:ErrorResponse;
            if (err.code = 'ConditionalCheckFailedException') {
                resp = new ErrorResponse('Duplication error. There is already a user with that alias', err.statusCode);
            }
            else {
                resp = new ErrorResponse(err.message, err.statusCode);
            }
            context.fail(JSON.stringify(resp));
        } else {
            console.log("Added item:", JSON.stringify(data));
        }
    }).promise();

    let u = new User(event.id, event.alias, event.name, event.profilePic, creation.toString());

    console.log(`created user with id ${u.id}`);

    console.log('Leaving user-create');
    return new UserResponse(u);

}