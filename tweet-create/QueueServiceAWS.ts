import { SQS } from 'aws-sdk';

export class QueueServiceAWS {
    private queueUrl:string;

    constructor() {
        this.queueUrl = 'https://sqs.us-west-1.amazonaws.com/658723855780/read-followers';
    }

    async addToReadFollowersQueue(authorAlias:string, created:number):Promise<boolean> {   
        let sqs = new SQS({ apiVersion: "2012-11-05", region: "us-west-1" });

        let queueParams:SQS.SendMessageRequest = {
            MessageBody: `${authorAlias}:${created}`,
            QueueUrl: this.queueUrl
        };

        let qResp = await sqs.sendMessage(queueParams).promise();

        if (qResp.$response.error) {
            if (qResp.$response.error) {
                console.error("Error sending to read-followers queue", qResp.$response.error);
                // Notify somehow
            }
        
            else {
                console.log("Success sending to queue", qResp.MessageId);
            }
        }

        return true;
    }
}