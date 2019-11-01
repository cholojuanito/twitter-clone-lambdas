import TweetCollectionResponse from "./TweetCollectionResponse";
import TweetCollectionFeedStoryGetRequest from "./TweetCollectionFeedStoryRequest";
import Tweet from "./Tweet";
import { Media, MediaType } from "./Media";
import Hashtag from "./Hashtag";
import Mention from "./Mention";

export const handler = async (event: TweetCollectionFeedStoryGetRequest): Promise<TweetCollectionResponse> => {

    console.log('Entering user-feed')

    // Get user from event.userId
    // Get followers
    // Get followers' tweets

    let h1 = new Hashtag('#rogerfederer', ['t_abcdef', 't_fedcba']);
    let h2 = new Hashtag('#goat', ['t_654321']);
    let h3 = new Hashtag('#roger', ['t_123456']);

    let m1 = new Mention('rogerfederer', 'rogerfederer');
    let m2 = new Mention('roger', 'roger');

    let t1 = new Tweet('t_123456', event.userId, 'Some message to share with y\'all about the #goat #roger', 
    new Media('some_path1', MediaType.Video), 
    [h2, h3], 
    [], 
    [], 
    Date.UTC(2019, 9, 9, 18, 20, 35, 30).toString());

    let t2 = new Tweet('t_654321', event.userId, 'Ma boi @roger showing that he\'s the #goat once again', 
    null, 
    [h2],
    [m2], 
    [], 
    Date.now().toString());

    let t3 = new Tweet('t_abcdef', event.userId, 'Way to go #rogerfederer! Solid match tonight', 
    new Media('some_path2', MediaType.Image), 
    [h1], 
    [], 
    [], 
    Date.now().toString());

    let t4 = new Tweet('t_fedcba', event.userId, 'Some message to share with @rogerfederer about being the #goat #rogerfederer', 
    new Media('some_path4', MediaType.Video), 
    [h1, h2], 
    [m1], 
    [], 
    Date.now().toString());

    console.log('Leaving user-feed');

    return new TweetCollectionResponse([t1, t2, t3, t4], event.pageSize);

}