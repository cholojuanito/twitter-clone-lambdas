class TweetCollectionByHashtagGetRequest {
    public hashtag:string;
    public pageSize:number;
    public lastKey:Object;
    
    constructor (word:string, pageSize:number, lastKey:Object) {
        this.hashtag = word;
        this.pageSize = pageSize;
        this.lastKey = lastKey;
    }
}

export default TweetCollectionByHashtagGetRequest;