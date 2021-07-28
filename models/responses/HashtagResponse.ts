import Hashtag from "../entities/Hashtag";

class HashtagResponse {
    public data:Hashtag;

    constructor(data:Hashtag) {
        this.data = data;
    }
}

export default HashtagResponse;