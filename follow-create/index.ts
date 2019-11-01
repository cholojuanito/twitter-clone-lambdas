import FollowCreateRequest from "./FollowCreateRequest";
import FollowResponse from "./FollowResponse";
import Follow from "./Follow";
import uuid = require("uuid");

export const handler = async (event: FollowCreateRequest): Promise<FollowResponse> => {

    console.log('Entering user-create')

    let id = 'f_' + uuid.v4()

    let f = new Follow(id, event.followerId, event.followeeId, true, Date.now().toString());

    console.log(`created follow with id ${f.id}`);

    console.log('Leaving user-create');

    return new FollowResponse(f);

}