import TweetCollectionResponse from "./TweetCollectionResponse";
import TweetCollectionFeedStoryGetRequest from "./TweetCollectionFeedStoryRequest";
import Tweet from "./Tweet";
import { Media, MediaType } from "./Media";
import Hashtag from "./Hashtag";
import Mention from "./Mention";

export const handler = async (event: TweetCollectionFeedStoryGetRequest): Promise<TweetCollectionResponse> => {

    console.log('Entering user-story')

    let h1 = new Hashtag('hashtag', ['t_8kndi', 't_12kdufdlm', 't_ajdlkafudo']);
    let h2 = new Hashtag('nashtag', ['t_8kndi', 't_ajdlkafudo']);

    let m1 = new Mention('dos-dos', 'dos-dos');

    let t1 = new Tweet('t_8kndi', event.userId, 'Some message to share with y\'all about the #hashtag #nashtag', 
    null, 
    [h1, h2], 
    [], 
    [], 
    Date.UTC(2019, 9, 9, 18, 20, 35, 30).toString());

    let t2 = new Tweet('t_45898jdkl', event.userId, 'Ma boi @dos-dos showing that he\'s the best once again', 
    null, 
    [],
    [m1], 
    [], 
    Date.now().toString());

    let t3 = new Tweet('t_12kdufdlm', event.userId, 'Testing some #hashtag', 
    null, 
    [h1], 
    [], 
    [], 
    Date.now().toString());

    let t4 = new Tweet('t_ajdlkafudo', event.userId, '#nashtag stuff about the starry night, go Van Gogh', 
    new Media('https://www.worldatlas.com/r/w728-h425-c728x425/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg', MediaType.Image), 
    [h2], 
    [], 
    [], 
    Date.now().toString());

    let t5 = new Tweet('t_009090', event.userId, '#nashtag stuff about the starry night, go Van Gogh', 
    new Media('https://www.worldatlas.com/r/w728-h425-c728x425/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg', MediaType.Image), 
    [h2], 
    [], 
    [], 
    Date.now().toString());

    let t6 = new Tweet('t_874939', event.userId, '#nashtag stuff about the starry night, go Van Gogh', 
    new Media('https://www.worldatlas.com/r/w728-h425-c728x425/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg', MediaType.Image), 
    [h2], 
    [], 
    [], 
    Date.now().toString());

    let t7 = new Tweet('t_409549859403', event.userId, '#nashtag stuff about the starry night, go Van Gogh', 
    new Media('https://www.worldatlas.com/r/w728-h425-c728x425/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg', MediaType.Image), 
    [h2], 
    [], 
    [], 
    Date.now().toString());

    let t8 = new Tweet('t_daf8984932', event.userId, '#nashtag stuff about the starry night, go Van Gogh', 
    new Media('https://www.worldatlas.com/r/w728-h425-c728x425/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg', MediaType.Image), 
    [h2], 
    [], 
    [], 
    Date.now().toString());

    let t9 = new Tweet('t_fdo93840', event.userId, '#nashtag stuff about the starry night, go Van Gogh', 
    new Media('https://www.worldatlas.com/r/w728-h425-c728x425/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg', MediaType.Image), 
    [h2], 
    [], 
    [], 
    Date.now().toString());

    let t10 = new Tweet('t_39094da', event.userId, '#nashtag stuff about the starry night, go Van Gogh', 
    new Media('https://www.worldatlas.com/r/w728-h425-c728x425/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg', MediaType.Image), 
    [h2], 
    [], 
    [], 
    Date.now().toString());

    console.log('Leaving user-story');

    return new TweetCollectionResponse([t1, t2, t3, t4, t5, t6, t7, t8, t9, t10], event.pageSize);

}