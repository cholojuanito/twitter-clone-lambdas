class HashtagCreateRequest {
    public word:string;
    public tweetId:string;

    constructor(word:string, tweetId:string) {
        this.word = word;
        this.tweetId = tweetId;
    }
}

export default HashtagCreateRequest;