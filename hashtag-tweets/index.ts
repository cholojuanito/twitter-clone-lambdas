import TweetCollectionByHashtagGetRequest from "./TweetCollectionByHashtagRequest";
import TweetCollectionResponse from "./TweetCollectionResponse";
import Tweet from "./Tweet";
import { Media, MediaType } from "./Media";
import Hashtag from "./Hashtag";
import Mention from "./Mention";

export const handler = async (event: TweetCollectionByHashtagGetRequest): Promise<TweetCollectionResponse> => {

    console.log('Entering get-tweets-by-hashtag');
    let h1 = new Hashtag('hashtag', ['t_123456', 't_abcdef', 't_fedcba']);
    let h2 = new Hashtag('nashtag', ['t_123456', 't_fedcba']);

    let m1 = new Mention('dos-dos', 'dos-dos');

    let t1 = new Tweet('t_123456', 'u_def', 'Some message to share with y\'all about the #hashtag #nashtag', 
    null,
    [h1, h2], 
    [], 
    [], 
    Date.UTC(2019, 9, 9, 18, 20, 35, 30).toString());

    let t2 = new Tweet('t_123456', '0miJZZ9DdhQWOnRguB4MCvfe0KV2', 'Some message to share with y\'all about the #hashtag', 
    null,
    [h1], 
    [], 
    [], 
    Date.UTC(2019, 9, 9, 18, 20, 35, 30).toString());

    let t3 = new Tweet('t_123456', 'u_def', 'Some message to share with y\'all about the #hashtag', 
    null,
    [h1], 
    [], 
    [], 
    Date.UTC(2019, 9, 9, 18, 20, 35, 30).toString());

    let t4 = new Tweet('t_fedcba', 'u_djlka192', '#nashtag stuff about the starry night, go Van Gogh', 
    new Media('https://www.worldatlas.com/r/w728-h425-c728x425/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg', MediaType.Image), 
    [h2], 
    [], 
    [], 
    Date.now().toString());

    let t5 = new Tweet('t_499889', 'u_jdaklk3u7', '#nashtag stuff about the starry night, go Van Gogh', 
    new Media('https://www.worldatlas.com/r/w728-h425-c728x425/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg', MediaType.Image), 
    [h2], 
    [], 
    [], 
    Date.now().toString());

    let t6 = new Tweet('t_doaun29', 'u_jdaklk3u7', '#nashtag stuff about the starry night, go Van Gogh', 
    new Media('https://www.worldatlas.com/r/w728-h425-c728x425/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg', MediaType.Image), 
    [h2], 
    [], 
    [], 
    Date.now().toString());

    let t7 = new Tweet('t_dfaoui11', 'u_bbbb21', '#nashtag stuff about the starry night, go Van Gogh', 
    new Media('https://www.worldatlas.com/r/w728-h425-c728x425/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg', MediaType.Image), 
    [h2], 
    [], 
    [], 
    Date.now().toString());

    let t8 = new Tweet('t_11111', 'u_bbbb21', '#nashtag stuff about the starry night, go Van Gogh', 
    new Media('https://www.worldatlas.com/r/w728-h425-c728x425/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg', MediaType.Image), 
    [h2], 
    [], 
    [], 
    Date.now().toString());

    let t9 = new Tweet('t_22222', 'u_aaaaaa', '#nashtag stuff about the starry night, go Van Gogh', 
    new Media('https://www.worldatlas.com/r/w728-h425-c728x425/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg', MediaType.Image), 
    [h2], 
    [], 
    [], 
    Date.now().toString());

    let t10 = new Tweet('t_23333', 'u_9938kkkk', '#nashtag stuff about the starry night, go Van Gogh', 
    new Media('https://www.worldatlas.com/r/w728-h425-c728x425/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg', MediaType.Image), 
    [h2], 
    [], 
    [], 
    Date.now().toString());

    let t11 = new Tweet('t_44444', 'u_39kkdh', '#nashtag stuff about the starry night, go Van Gogh', 
    new Media('https://www.worldatlas.com/r/w728-h425-c728x425/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg', MediaType.Image), 
    [h2], 
    [], 
    [], 
    Date.now().toString());

    let t12 = new Tweet('t_55555', 'u_39kkdh', '#nashtag stuff about the starry night, go Van Gogh', 
    new Media('https://www.worldatlas.com/r/w728-h425-c728x425/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg', MediaType.Image), 
    [h2], 
    [], 
    [], 
    Date.now().toString());

    let t13 = new Tweet('t_66676', 'u_293043', '#nashtag stuff about the starry night, go Van Gogh', 
    new Media('https://www.worldatlas.com/r/w728-h425-c728x425/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg', MediaType.Image), 
    [h2], 
    [], 
    [], 
    Date.now().toString());

    let t14 = new Tweet('t_777777', 'u_293043', '#hashtag stuff about the starry night, go Van Gogh', 
    new Media('https://www.worldatlas.com/r/w728-h425-c728x425/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg', MediaType.Image), 
    [h1], 
    [], 
    [], 
    Date.now().toString());

    let ret:Tweet[] = [];

    if (event.hashtag == h1.word) {
        ret = [t1, t2, t3, t14];
    }
    else if (event.hashtag == h2.word) {
        ret = [t1, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13];
    }

    console.log('Leaving get-tweets-by-hashtag');

    return new TweetCollectionResponse(ret, event.pageSize);

}