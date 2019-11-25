import { Media } from "./Media";

class UserCreateRequest {
    public id:string;
    public name:string;
    public alias:string;
    public profilePic:Media;

    constructor(id:string, name:string, alias:string, pic:Media) {
        this.id = id;
        this.name = name;
        this.alias = alias;
        this.profilePic = pic;
    }
}

export default UserCreateRequest;