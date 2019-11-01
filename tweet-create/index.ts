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

    let id = 't_' + uuid.v4()

    // TODO change these to query db first
    let hashtags = [];
    event.hashtags.forEach(h => {
        hashtags.push(new Hashtag(h, [id]));
    });

    let mentions = [];
    event.mentions.forEach(m => {
        mentions.push(new Mention(m, m));
    });

    let urls = [];
    event.urls.forEach(url => {
        urls.push(new ExternalURL(url));
    });

    let t = new Tweet(id, event.authorId, 
        event.message, 
        new Media(event.mediaPath, MediaType.Image),
         hashtags,
         mentions,
         urls,
         Date.now().toString()
        );

    console.log('Leaving tweet-create');

    return new TweetResponse(t);

}