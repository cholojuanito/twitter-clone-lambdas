import { SQSEvent, SQSRecord, Context } from 'aws-lambda'
import { ErrorResponse } from './ErrorResponse';
import { FeedDAODynamo } from './FeedDAODynamo';

export const handler = async (event: SQSEvent, context:Context) => {
    let feedDAO = new FeedDAODynamo();

    try {
        for (var msg of event.Records) {
            let parts = msg.body.split(":");
            let timestamp =  parseInt(parts[1]);
            let users:string[] = msg.messageAttributes.followers.stringValue.split(':');

            await feedDAO.batchAdd(users, timestamp, parts[0]);

            console.log(`finished record ${msg.body}`)
        }
    }
    catch(e) {
        console.error(`Error ${e.message}`)
        let resp:ErrorResponse = new ErrorResponse(e.message, 400);
        context.fail(JSON.stringify(resp));
    }

}