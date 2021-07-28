import { TweetDAO } from "./TweetDAO";
import { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import TweetCreateRequest from './TweetCreateRequest';

export class TweetDAODynamo implements TweetDAO {
    private docClient:DynamoDB.DocumentClient;

    constructor() {
        this.docClient = new DocumentClient();
    }

    async add(event: TweetCreateRequest, id:string, timestamp:number, hashtags:string[]):Promise<string> {
        let media = null;
        let mediaType = null;
        if (event.media != null) {
            media = event.media.path;
            mediaType = event.media.type;
        }
        let mentions:string[] = event.mentions.map((m) => m.alias);
        let urls:string[] = event.urls.map((u) => u.route);

        let tweetParams:DynamoDB.DocumentClient.PutItemInput = {
            TableName: 'Tweets',
            Item: {
                id: id,
                authorId: event.authorId,
                message: event.message,
                media: media,
                mediaType: mediaType,
                hashtags: hashtags,
                mentions: mentions,
                urls: urls,
                created: timestamp
            },     
        };
    
        let result = await this.docClient.put(tweetParams).promise();

        if (result.$response.error) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(result.$response.error));
            if (result.$response.error.code = 'ConditionalCheckFailedException') {
                throw new Error('Duplication error. There is already a tweet with that id');
            }
            else {
                throw new Error(`${JSON.stringify(result.$response.error)}`);
            }
        }


        return id;
    }
    
}