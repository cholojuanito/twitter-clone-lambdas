class TweetUpdateRequest {
    public id:string;
    public action:TweetUpdateAction;
    public value:TweetUpdates;

    constructor(id:string, action:TweetUpdateAction, value:TweetUpdates) {
        this.id = id;
        
    }
}

class TweetUpdates {
    public message:string;
    public mediaPath:string;
    public hashtags:string[];
    public mentions:string[];
    public urls:string[];
}

enum TweetUpdateAction {
    Replace = "replace"
}

export default TweetUpdateRequest;