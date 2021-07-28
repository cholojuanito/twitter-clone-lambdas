class HashtagUpdateRequest {
    public word:string;
    public action:HashtagUpdateAction;
    public value:HashtagUpdates;

    constructor(word:string, action:string, value:HashtagUpdates) {
        this.word = word;
        this.value = value;
        if (action == "add") {
            this.action = HashtagUpdateAction.Add;
        }
        else {
            this.action = HashtagUpdateAction.Remove;
        }
    }
}

class HashtagUpdates {
    public tweetId:string;

    constructor(tweetId:string) {
        this.tweetId = tweetId;
    }
}

enum HashtagUpdateAction {
    Add = "add",
    Remove = "remove"
}

export { HashtagUpdateRequest,  HashtagUpdateAction, HashtagUpdates};