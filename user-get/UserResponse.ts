import User from "./User";

class UserResponse {
    private data:User;

    constructor(data:User) {
        this.data = data;
    }
}

export default UserResponse;