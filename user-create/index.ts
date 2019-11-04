import UserCreateRequest from "./UserCreateRequest";
import UserResponse from "./UserResponse";
import User from "./User";
import uuid = require("uuid");

export const handler = async (event: UserCreateRequest): Promise<UserResponse> => {

    console.log('Entering user-create')

    let id = 'u_' + uuid.v4()

    let u = new User('u_1233213knl21', event.alias, event.name, event.profilePic);

    console.log(`created user with id ${u.id}`);

    console.log('Leaving user-create');

    return new UserResponse(u);

}