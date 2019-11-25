class UserUpdateRequest {
    public alias:string;
    public action:UserUpdateAction;
    public value:UserUpdates;

    constructor(alias:string, action:string, value:UserUpdates) {
        this.alias = alias;
        this.value = value;
        if (action == "replace") {
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