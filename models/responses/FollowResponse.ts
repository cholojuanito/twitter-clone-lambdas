import Follow from "../entities/Follow";

class FollowResponse {
    public data:Follow;

    constructor(data:Follow) {
        this.data = data;
    }
}

export default FollowResponse;