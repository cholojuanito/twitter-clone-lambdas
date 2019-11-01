class TweetCreateRequest {
    public authorId:string;
    public message:string;
    public mediaPath:string;
    public hashtags:string[];
    public mentions:string[];
    public urls:string[];

    constructor(id:string, message:string, picPath:string, hashtags:string[], mentions:string[], urls:string[]) {
        this.authorId = id;
        this.message = message;
        this.mediaPath = picPath;
        this.hashtags = hashtags;
        this.mentions = mentions;
        this.urls = urls;
    }
}

export default TweetCreateRequest;