class FollowExistsRequest {
    public followerId:string;
    public followeeId:string;

    constructor(followerId:string, followeeId:string) {
        this.followerId = followerId;
        this.followeeId = followeeId;
    }
}

export default FollowExistsRequest;