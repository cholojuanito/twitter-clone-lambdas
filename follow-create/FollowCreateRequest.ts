class FollowCreateRequest {
    public followerId:string;
    public followeeId:string;

    constructor(follower:string, followee:string) {
        this.followerId = follower;
        this.followeeId = followee;
    }
}

export default FollowCreateRequest;