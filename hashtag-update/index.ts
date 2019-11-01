import { HashtagUpdateRequest, HashtagUpdateAction, HashtagUpdates } from "./HashtagUpdateRequest";
import HashtagResponse from "./HashtagResponse";
import Hashtag from "./Hashtag";

export const handler = async (event: HashtagUpdateRequest): Promise<HashtagResponse> => {

    console.log('Entering hashtag-update');

    let h = new Hashtag(event.word, ["t_123456", "t_abc123"]);

    if (event.action == HashtagUpdateAction.Add) {
        var index = h.tweetIds.indexOf(event.value.tweetId);
        if (index === -1) {
            h.tweetIds.push(event.value.tweetId);
       }
    }
    else {
        var index = h.tweetIds.indexOf(event.value.tweetId);
        if (index !== -1) {
             h.tweetIds.splice(index, 1);
        }
    }

    console.log('Leaving hashtag-update');

    return new HashtagResponse(h);

}