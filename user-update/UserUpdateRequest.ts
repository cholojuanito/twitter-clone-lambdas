class UserUpdateRequest {
    public id:string;
    public action:UserUpdateAction;
    public value:UserUpdates;

    constructor(id:string, action:string, value:UserUpdates) {
        this.id = id;
        this.value = value;
        if (this.action == "replace") {
            this.action = UserUpdateAction.Replace;
        }
    }
}

class UserUpdates {
    public profilePicPath:string;

    constructor(profilePicPath:string) {
        this.profilePicPath = profilePicPath;
    }
}

enum UserUpdateAction {
    Replace = "replace"
}

export { UserUpdateRequest, UserUpdateAction, UserUpdates };