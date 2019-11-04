import uuid = require("uuid");
import TweetCreateRequest from "./TweetCreateRequest";
import TweetResponse from "./TweetResponse";
import Tweet from "./Tweet";
import { Media, MediaType } from "./Media";
import Hashtag from "./Hashtag";
import Mention from "./Mention";
import ExternalURL from "./ExternalURL";

export const handler = async (event: TweetCreateRequest): Promise<TweetResponse> => {

    console.log('Entering tweet-create')

    let id = 't_' + uuid.v4();
    // t_123456

    // TODO change these to query db first
    let hashtags = [];
    let mentions = [];
    let urls = [];

    let t = new Tweet(id, event.authorId, 
        event.message, 
        event.media,
         event.hashtags,
         event.mentions,
         event.urls,
         Date.now().toString()
        );

    console.log('Leaving tweet-create');

    return new TweetResponse(t);

}