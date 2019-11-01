import Hashtag from "./Hashtag";
import HashtagCreateRequest from "./HashtagCreateRequest";
import HashtagResponse from "./HashtagResponse";

export const handler = async (event: HashtagCreateRequest): Promise<HashtagResponse> => {

    console.log('Entering hashtag-create')

    let h = new Hashtag(event.word, [event.tweetId]);

    console.log(`created hashtag for word ${h.word}`);

    console.log('Leaving hashtag-create');

    return new HashtagResponse(h);

}