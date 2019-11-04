import HashtagResponse from "./HashtagResponse";
import HashtagGetRequest from "./HashtagGetRequest";
import Hashtag from "./Hashtag";

export const handler = async (event: HashtagGetRequest): Promise<HashtagResponse> => {

    console.log('Entering hashtag-get');
    let h1:string = 'hashtag';
    let h2:string = 'nashtag';
    let h3:string = 'federer';
    let h4:string = 'something';
    let h5:string = 'newtag';
    let h6:string = 'one';

    let hashtag:Hashtag = new Hashtag(event.word, []);

    if (event.word == h1) {
        hashtag.tweetIds = ['t7', 't8', 't9', 't11'];
    }
    else if (event.word == h2) {
        hashtag.tweetIds = ['t7', 't8', 't10', 't11', 't12'];
    }
    else if (event.word == h3) {
        hashtag.tweetIds = ['t12'];
    }
    else if (event.word == h4) {
        hashtag.tweetIds = ['t9'];
    }
    else if (event.word == h5) {
        hashtag.tweetIds = ['t10'];
    }
    else if (event.word == h6) {
        hashtag.tweetIds = ['t13'];
    }
    else {
        hashtag = null;
    }

    console.log('Leaving hashtag-get');

    return new HashtagResponse(hashtag);

}