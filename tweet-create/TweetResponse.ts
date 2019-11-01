import Tweet from "./Tweet";

class TweetResponse {
    public data:Tweet;

    constructor(data:Tweet) {
        this.data = data;
    }
}

export default TweetResponse;