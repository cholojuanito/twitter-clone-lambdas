import { Media } from "./Media";

class User {
    public id:string;
    public alias:string;
    public name:string;
    publicprofilePic:Media;

    constructor(id:string, alias:string, name:string, profilePic:Media) {
        this.id = id;
        this.alias = alias;
        this.name = name;
        this.profilePic = profilePic;
    }
}

export default User;