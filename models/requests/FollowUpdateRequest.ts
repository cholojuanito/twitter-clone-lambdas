class FollowUpdateRequest {
    public id:string;
    public action:FollowUpdateAction;
    public value:FollowUpdates;

    constructor(id:string, action:string, value:FollowUpdates) {
        this.id = id;
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
    public active:boolean;

    constructor(active:boolean) {
        this.active = active;
    }
}

enum FollowUpdateAction {
    Follow = "follow",
    Unfollow = "unfollow"
}

export default { FollowUpdateRequest, FollowUpdateAction, FollowUpdates};