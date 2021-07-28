import TweetCreateRequest from './TweetCreateRequest';

export interface TweetDAO {
    add(event:TweetCreateRequest, id:string, timestamp:number, hashtags:string[]):Promise<string>;
}