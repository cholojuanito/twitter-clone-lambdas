import { DynamoDB } from 'aws-sdk';
import { Context } from 'aws-lambda';
import UserGetRequest from "./UserGetRequest";
import UserResponse from "./UserResponse";
import User from "./User";
import { Media, MediaType } from "./Media";
import { ErrorResponse } from './ErrorResponse';

export const handler = async (event: UserGetRequest, context:Context): Promise<UserResponse> => {

    console.log('Entering user-get')

    let docClient = new DynamoDB.DocumentClient();

    let params:DynamoDB.DocumentClient.QueryInput = {
        TableName: 'Users',
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
            console.error("Unable to get user by id. Error JSON:", JSON.stringify(err));
            let resp:ErrorResponse = new ErrorResponse(err.message, err.statusCode);
            context.fail(JSON.stringify(resp));
        } else {
            console.log("Got item:", JSON.stringify(data));
        }
    }).promise();

    let u: User = null;
    if (result.Count > 0) {
        let data = result.Items[0];
        u = new User(data.id, data.alias, data.name, new Media(data.profilePic, MediaType.Image), data.created);
    }
    else {
        console.error("Unable to get user by id.");
        // ? Error response?
    }

    console.log('Leaving user-get');

    return new UserResponse(u);

}