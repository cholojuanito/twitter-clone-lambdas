import User from "../entities/User";

class UserResponse {
    public data:User;

    constructor(data:User) {
        this.data = data;
    }
}

export default UserResponse;