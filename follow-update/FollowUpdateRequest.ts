class FollowUpdateRequest {
    public followerId:string;
    public followeeId:string;
    public action:FollowUpdateAction;
    public value:FollowUpdates;

    constructor(followerId:string, followeeId:string, action:string, value:FollowUpdates) {
        this.followerId = followerId;
        this.followeeId = followeeId;
        this.value = value;
        if (this.action == "follow") {
            this.action = FollowUpdateAction.Follow;
        }
        else if  (this.action == "unfollow") {
            this.action = FollowUpdateAction.Unfollow;
        }
    }
}

class FollowUpdates {
    public isActive:boolean;

    constructor(active:boolean) {
        this.isActive = active;
    }
}

enum FollowUpdateAction {
    Follow = "follow",
    Unfollow = "unfollow"
}

export { FollowUpdateRequest, FollowUpdateAction, FollowUpdates};