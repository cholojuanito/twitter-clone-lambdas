import { HashtagUpdateRequest, HashtagUpdateAction, HashtagUpdates } from "./HashtagUpdateRequest";
import HashtagResponse from "./HashtagResponse";
import Hashtag from "./Hashtag";

export const handler = async (event: HashtagUpdateRequest): Promise<HashtagResponse> => {

    console.log('Entering hashtag-update');

    let tag1 = 'hashtag';
    let tag2 = 'nashtag';
    let h:Hashtag = null;

    if (event.word == tag1) {
        h = new Hashtag(tag1, ['t7', 't8', 't9', 't11']);
    }
    else if (event.word == tag2) {
        h = new Hashtag(tag2, ['t7', 't8', 't10', 't11', 't12']);
    }

    if (event.action == HashtagUpdateAction.Add) {
        if (event.word == tag1) {
            var index = h.tweetIds.indexOf(event.value.tweetId);
            if (index === -1) {
                h.tweetIds.push(event.value.tweetId);
            }
        }
        else if (event.word == tag2) {
            var index = h.tweetIds.indexOf(event.value.tweetId);
            if (index === -1) {
                h.tweetIds.push(event.value.tweetId);
            }
        }
    }
    else {
        if (event.word == tag1) {
            var index = h.tweetIds.indexOf(event.value.tweetId);
            if (index !== -1) {
                h.tweetIds.splice(index, 1);
            }
        }
        else if (event.word == tag2) {
            var index = h.tweetIds.indexOf(event.value.tweetId);
            if (index !== -1) {
                h.tweetIds.splice(index, 1);
            }
        }
    }

    console.log('Leaving hashtag-update');

    return new HashtagResponse(h);

}