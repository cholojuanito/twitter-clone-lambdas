import { SQS } from 'aws-sdk';
let chunk = require('chunk');

export class QueueService {
    private queueUrl:string;
    private batchSize:number;

    constructor() {
        this.queueUrl = 'https://sqs.us-west-1.amazonaws.com/658723855780/add-to-feed';
        this.batchSize = 100;
    }

    async addToFeedQueue(authorAlias:string, created:string, items:string[]):Promise<boolean> {   
        let sqs = new SQS({ apiVersion: "2012-11-05", region: "us-west-1" });
        let chunked:string[][] = chunk(items, this.batchSize);
        console.log(`Chunked array ${chunked.length} batches of size ${chunked[0].length}`)

        for (var i = 0; i < chunked.length; i++) {
            let entries:string = chunked[i].join(':');
            let queueParams:SQS.SendMessageRequest = {
                MessageBody: `${authorAlias}:${created}`,
                MessageAttributes: {
                    'followers': {
                        DataType: "String",
                        StringValue: entries,
                    }
                },
                QueueUrl: this.queueUrl,
            };

            console.log('Sending message batch');
            let qResp = await sqs.sendMessage(queueParams, (err: AWS.AWSError, data: SQS.Types.SendMessageResult) => {
                if (err) {
                    console.log("Error sending batches of followers", err);
                }
                else {
                    console.log("Success", data.MessageId);
                }
            }).promise();
        }

        // if (qResp.MessageId != null || qResp.MessageId != undefined) {
        //     return true;
        // }
        // else {
        //     return false;
        // }

        return true;
    }
}