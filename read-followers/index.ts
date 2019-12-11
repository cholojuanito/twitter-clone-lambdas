import { DynamoDB } from 'aws-sdk';
import { SQSEvent, SQSRecord, Context } from 'aws-lambda'
import { ErrorResponse } from './ErrorResponse';
import { QueueService } from './QueueService';
import { FollowsDAODynamo } from './FollowsDAODynamo';
import { FollowsDAO } from 'FollowsDAO';
import { QueueServiceAWS } from 'QueueServiceAWS';

export const handler = async (event: SQSEvent, context:Context) => {
let qService:QueueService = new QueueServiceAWS();
let followsDAO:FollowsDAO = new FollowsDAODynamo();
    try {
        for (var msg of event.Records) {

            console.log(`New record ${msg.body}`);
            let parts = msg.body.split(':');

            let followResults = await followsDAO.getFollowers(parts[0]);
            console.log(`Num followers: ${followResults.length}`);

            if (followResults.length > 0) {
                await qService.addToFeedQueue(parts[0], parts[1], followResults);                
            }
                
            console.log(`finished record`)
    
        }
    } catch (e) {
        console.error(`Error ${e.message}`)
        let resp:ErrorResponse = new ErrorResponse(e.message, 400);
        context.fail(JSON.stringify(resp));
    }

}