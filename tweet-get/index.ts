import TweetGetRequest from "./TweetGetRequest";
import TweetResponse from "./TweetResponse";
import Tweet from "./Tweet";
import Hashtag from "./Hashtag";
import Mention from "./Mention";
import { Media, MediaType } from "./Media";

export const handler = async (event: TweetGetRequest): Promise<TweetResponse> => {

    console.log('Entering tweet-get');

    let h1 = new Hashtag('#abc123', ['t_adkBuOi123']);
    let h2 = new Hashtag('#michaeljackson', ['t_adkBuOi123']);

    let m1 = new Mention('cholojuanito', 'cholojuanito');

    let t = new Tweet('t_adkBuOi123', 'u_1234567', 
    'Some tweet message with #abc123 and #michealjackson in it. You know @cholojuanito?',
    null, 
    [h1, h2],
    [m1],
    [],
    Date.UTC(2019, 10, 25, 10, 10, 10).toString()
    );

    console.log('Leaving tweet-get');

    return new TweetResponse(t);

}