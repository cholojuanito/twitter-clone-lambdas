import { Media } from "../entities/Media";

class UserCreateRequest {
    public name:string;
    public alias:string;
    public profilePic:Media;

    constructor(name:string, alias:string, pic:Media) {
        this.name = name;
        this.alias = alias;
        this.profilePic = pic;
    }
}

export default UserCreateRequest;