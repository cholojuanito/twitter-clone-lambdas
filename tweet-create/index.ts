import { v4 } from 'uuid';
import { DynamoDB, SQS } from 'aws-sdk';
import { Context, Callback } from 'aws-lambda'
import TweetCreateRequest from "./TweetCreateRequest";
import TweetResponse from "./TweetResponse";
import Tweet from "./Tweet";
import { ErrorResponse } from './ErrorResponse';
import { CreateTweetService } from './CreateTweetService';

export const handler = async (event: TweetCreateRequest, context:Context): Promise<TweetResponse> => {

    let service = new CreateTweetService();
    let t:Tweet = null;
    try {
        console.log('Entering tweet-create')
        t = await service.create(event);
    } catch (e) {
        console.error(`Error ${e.message}`)
        let resp:ErrorResponse = new ErrorResponse(e.message, 400);
        context.fail(JSON.stringify(resp));
    }    

    console.log('Leaving tweet-create');

    return new TweetResponse(t);

}