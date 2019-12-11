import { FollowsDAO } from "./FollowsDAO";
import { DynamoDB, AWSError } from "aws-sdk";
import { Request } from "aws-sdk/lib/request";

export class FollowsDAODynamo implements FollowsDAO {
    private docClient:DynamoDB.DocumentClient;
    private limit:number;

    constructor() {
        this.docClient = new DynamoDB.DocumentClient();
    }

    async getFollowers(alias: string): Promise<string[]> {
        let gotAllFollowers:boolean = false;
        let lastKey:DynamoDB.DocumentClient.Key = null;
        let followers:string[] = [];
        let followResults = null;
        

        while (gotAllFollowers != true) {
            let followersParams:DynamoDB.DocumentClient.QueryInput = {
                TableName: 'Follows',
                IndexName: 'reverse-index',
                KeyConditionExpression: '#uid = :uid',
                ScanIndexForward: false, // Descending order
                ExpressionAttributeNames: {
                    '#uid': 'followeeId'
                },
                ExpressionAttributeValues: {
                    ':uid': alias
                }
            };


            if (lastKey != null || lastKey != undefined) {
                followersParams.ExclusiveStartKey = lastKey;
            }
    
            // console.log(`Getting followers with startKey of ${followersParams.ExclusiveStartKey}`);
    
            followResults = await this.docClient.query(followersParams).promise();

            if (followResults.Items.length > 0) {
                if (followResults.LastEvaluatedKey != null) {
                    lastKey = followResults.LastEvaluatedKey;
                }
                else  {
                    lastKey = null;
                    gotAllFollowers = true;
                }
                let toAdd:string[] = followResults.Items.map((item) => item.followerId);
                followers.push(...toAdd);
            }
            
        }

        if (followResults == null) {
            return [];
        }
        else {
            return followers;
        }
    }    
    
    getFollowees(alias: string): Promise<string[]> {
        throw new Error("getFollowees not implemented.");
    }


}