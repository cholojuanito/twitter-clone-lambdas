import { QueueService } from './QueueService';
import { QueueServiceAWS } from './QueueServiceAWS';
import { TweetDAO } from './TweetDAO';
import { HashtagDAO } from './HashtagDAO';
import TweetCreateRequest from './TweetCreateRequest';
import Tweet from './Tweet';
import { v4 } from 'uuid';
import { TweetDAODynamo } from './TweetDAODynamo';
import { HashtagDAODynamo } from './HashtagDAODynamo';

export class CreateTweetService {
    private queue:QueueService;
    private tweetDAO:TweetDAO;
    private hashtagDAO:HashtagDAO;

    constructor() {
        this.queue = new QueueServiceAWS();
        this.tweetDAO = new TweetDAODynamo();
        this.hashtagDAO = new HashtagDAODynamo();
    }

    async create(event:TweetCreateRequest):Promise<Tweet> {
        let id = 't_' + v4();
        let hashtags:string[] = event.hashtags.map((tag) =>  tag.word);
        let timestamp = Math.floor(new Date().getTime() / 1000);

         await this.tweetDAO.add(event, id, timestamp, hashtags);
         if (hashtags.length > 0) {
            await this.hashtagDAO.batchAdd(hashtags, timestamp, event.authorId);
         }
         await this.queue.addToReadFollowersQueue(event.authorId, timestamp);

        return new Tweet(id, event.authorId, event.message, event.media, event.hashtags, event.mentions, event.urls, timestamp);
    }
}