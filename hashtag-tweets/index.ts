import TweetCollectionByHashtagGetRequest from "./TweetCollectionByHashtagRequest";
import TweetCollectionResponse from "./TweetCollectionResponse";

export const handler = async (event: TweetCollectionByHashtagGetRequest): Promise<TweetCollectionResponse> => {

    console.log('Entering get-tweets-by-hashtag')

    console.log('Leaving get-tweets-by-hashtag');

    return new TweetCollectionResponse([], event.pageSize);

}