class UserCreateRequest {
    public name:string;
    public alias:string;
    public profilePicPath:string;

    constructor(name:string, alias:string, picPath:string) {
        this.name = name;
        this.alias = alias;
        this.profilePicPath = picPath;
    }
}

export default UserCreateRequest;