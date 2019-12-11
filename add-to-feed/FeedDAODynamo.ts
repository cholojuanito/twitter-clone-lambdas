import { FeedDAO } from "./FeedDAO";
import { DynamoDB } from "aws-sdk";

export class FeedDAODynamo implements FeedDAO {
    private docClient: DynamoDB.DocumentClient;

    constructor() {
        this.docClient = new DynamoDB.DocumentClient();
    }

    async add(alias: string, created: number, authorAlias: string): Promise<boolean> {
        let feedParams:DynamoDB.DocumentClient.PutItemInput = {
            TableName: 'Feeds',
            Item: {
                userId: alias,
                created: created,
                tweetKey: {
                    authorId: authorAlias,
                    created: created
                }
            }       
        };

        let feedResult = await this.docClient.put(feedParams, (err, data) => {
            if (err) {
                throw new Error('Error while adding tweet info to feed table');
            } else {
                console.log("Added tweet to feed");
            }
        }).promise();
        
        return feedResult.Attributes != null;
    }

    async batchAdd(aliases: string[], created: number, authorAlias: string): Promise<boolean> {
        // let items:DynamoDB.DocumentClient.BatchWriteItemRequestMap = {
        //     'Feeds': []
        // }; 

        for (var i = 0; i < aliases.length; i++) {
            let a:string = aliases[i];
            let feedParams:DynamoDB.DocumentClient.PutItemInput = {
                TableName: 'Feeds',
                Item: {
                    userId: a,
                    created: created,
                    tweetKey: {
                        authorId: authorAlias,
                        created: created
                    }
                }
            }

            let feedResult = 
                await this.docClient.put(feedParams).promise();

                if (feedResult.$response.error) {
                    console.log('error occurred while writing to feed table', feedResult.$response.error);
                }

                if (feedResult.Attributes != null) {
                    console.error(`Did not write to ${a}'s feed`);
                }
                else {
                    console.log(`Finished writing to ${a}'s feed table`);
                }
            }

        //  let feedParams:DynamoDB.DocumentClient.BatchWriteItemInput = {
        //      RequestItems: items,
        //  };

        //  let feedResult:DynamoDB.DocumentClient.BatchGetItemOutput = 
        //  await this.docClient.batchWrite(feedParams, (err, data) => {
        //     if (err) {
        //         throw new Error(`Error while adding tweet info to feed table: ${err}`);
        //     } else {
                // console.log("Added tweet to feed");
        //     }
        // }).promise();

        //  if (feedResult.UnprocessedKeys['Feeds'].Keys != null) {
        //     console.error('Did not write all of the feeds');
        //  }
        //  else {
        //      console.log('Finished writing to feed table');
        //  }

         return true;
         
    }

}