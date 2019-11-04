import { Media } from "./Media";

class User {
    public id:string;
    private alias:string;
    private name:string;
    private profilePic:Media;

    constructor(id:string, alias:string, name:string, profilePic:Media) {
        this.id = id;
        this.alias = alias;
        this.name = name;
        this.profilePic = profilePic;
    }
}

export default User;