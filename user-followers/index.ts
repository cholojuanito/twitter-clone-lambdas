import { DynamoDB } from 'aws-sdk';
import { Context } from 'aws-lambda';
import UserCollectionFollowingGetRequest from "./UserCollectionFollowGetRequest";
import UserCollectionResponse from "./UserCollectionResponse";
import { Media, MediaType } from "./Media";
import User from "./User";
import { ErrorResponse } from './ErrorResponse';

export const handler = async (event: UserCollectionFollowingGetRequest, context:Context): Promise<UserCollectionResponse> => {

    console.log('Entering followers-get')
    
    // Gets users that are currently following the asking-user
    let u:User[] = [];
    let docClient = new DynamoDB.DocumentClient();
    let followParams:DynamoDB.DocumentClient.QueryInput = {
        TableName: 'Follows',
        IndexName: 'reverse-index',
        KeyConditionExpression: '#uid = :uid',
        ScanIndexForward: false, // Descending order
        ExpressionAttributeNames: {
            '#uid': 'followeeId'
        },
        ExpressionAttributeValues: {
            ':uid': event.userId
        },
        Limit: event.pageSize,
    };

    if (event.lastKey != null && event.lastKey !== '') {
        let parts = event.lastKey.split(':');
        let lastKey = {
            'followeeId': parts[0],
            'followerId': parts[1]
        };
        followParams.ExclusiveStartKey = lastKey;
    }

    let followResults = await docClient.query(followParams, (err, data) => {
        if (err) {
            console.error("Unable to get user's followers. Error JSON:", JSON.stringify(err));
            let resp:ErrorResponse = new ErrorResponse(err.message, err.statusCode);
            context.fail(JSON.stringify(resp));
        } else {
            console.log("Got item:", JSON.stringify(data));
        }
    }).promise();
    
    let keys:DynamoDB.DocumentClient.Key[] = [];
    if (followResults.Count > 0) {
        for (let i = 0; i < followResults.Items.length; i++) {
            keys.push({'alias': followResults.Items[i].followerId});
        }
    }
    else {
        return new UserCollectionResponse(u, event.pageSize, null);
    }
    
    let userParams:DynamoDB.DocumentClient.BatchGetItemInput = {
        RequestItems: {
            'Users': {
                'ConsistentRead': true,
                'Keys': keys
            }
        },
    };

    let userResults = await docClient.batchGet(userParams, (err, data) => {
        if (err) {
            console.error("Unable to get users. Error JSON:", JSON.stringify(err));
            let resp:ErrorResponse = new ErrorResponse(err.message, err.statusCode);
            context.fail(JSON.stringify(resp));
        } else {
            console.log("Got item:", JSON.stringify(data));
        }
    }).promise();

    let users = userResults.Responses['Users'];
    if (users != null) {
        for (let idx = 0; idx < users.length; idx++) {
            let data = users[idx];
            u.push(new User(data.id, data.alias, data.name, new Media(data.profilePic, MediaType.Image), data.created));
        }
    }
    else {
        console.error("Unable to get user's followers");
        // ? Error response?
    }
    
    console.log('Leaving followers-get');

    return new UserCollectionResponse(u, event.pageSize, followResults.LastEvaluatedKey);

}