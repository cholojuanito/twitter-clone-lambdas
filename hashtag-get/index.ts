import HashtagResponse from "./HashtagResponse";
import HashtagGetRequest from "./HashtagGetRequest";
import Hashtag from "./Hashtag";

export const handler = async (event: HashtagGetRequest): Promise<HashtagResponse> => {

    console.log('Entering hashtag-get')

    console.log('Leaving hashtag-get');

    return new HashtagResponse(new Hashtag(event.word, ["t_123456"]));

}