import { HashtagDAO } from "./HashtagDAO";
import { DynamoDB } from "aws-sdk";

export class HashtagDAODynamo implements HashtagDAO {
    private docClient: DynamoDB.DocumentClient;

    constructor() {
        this.docClient = new DynamoDB.DocumentClient();
    }

    async add(hashtag: string, created: number, authorAlias: string): Promise<boolean> {
        throw new Error('Not implemented');
    }

    async batchAdd(hashtags: string[], timestamp: number, authorAlias: string): Promise<boolean> {
        
        let hashtagParams:DynamoDB.DocumentClient.PutItemInput = null;
        // Add hashtags to hashtag table    
        for (let idx = 0; idx < hashtags.length; idx++) {
            const element = hashtags[idx];
            hashtagParams = {
                TableName: 'Hashtags',
                Item: {
                    word: element,
                    created: timestamp,
                    tweetKey: {
                        'authorId': authorAlias,
                        'created': timestamp
                    }
                }
            };

            let hashtagResult = await this.docClient.put(hashtagParams).promise();

            if (hashtagResult.$response.error) {
                console.error("Unable to add hashtag. Error JSON:", JSON.stringify(hashtagResult.$response.error));
                throw new Error(`Unable to add hashtag. Error JSON: ${JSON.stringify(hashtagResult.$response.error)}`);
            }

            if (hashtagResult.Attributes != null) {
                console.log("Added hashtag");
            }
        }

        return true;
         
    }

}