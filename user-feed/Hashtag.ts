class Hashtag {
    public word:string;
    public tweetIds:string[];

    constructor(word:string, tweetIds:string[]) {
        this.word = word;
        this.tweetIds = tweetIds;
    }
}

export default Hashtag;