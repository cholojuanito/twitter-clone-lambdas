import { Media } from "./Media";

class User {
    public id:string;
    public alias:string;
    public name:string;
    public profilePic:Media;
    public created:string;

    constructor(id:string, alias:string, name:string, profilePic:Media, created:string) {
        this.id = id;
        this.alias = alias;
        this.name = name;
        this.profilePic = profilePic;
        this.created = created;
    }
}

export default User;