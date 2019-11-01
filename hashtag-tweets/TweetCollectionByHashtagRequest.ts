class TweetCollectionByHashtagGetRequest {
    public hashtag:string;
    public pageSize:number;
    public lastKey:string;
    
    constructor (word:string, pageSize:number, lastKey:string) {
        this.hashtag = word;
        this.pageSize = pageSize;
        this.lastKey = lastKey;
    }
}

export default TweetCollectionByHashtagGetRequest;