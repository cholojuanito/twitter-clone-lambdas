import UserCreateRequest from "./UserCreateRequest";
import UserResponse from "./UserResponse";
import User from "./User";
import { Media, MediaType } from "./Media";
import uuid = require("uuid");

export const handler = async (event: UserCreateRequest): Promise<UserResponse> => {

    console.log('Entering user-create')

    let id = 'u_' + uuid.v4()

    let u = new User(id, event.alias, event.name, new Media(event.profilePicPath, MediaType.Image));

    console.log(`created user with id ${u.id}`);

    console.log('Leaving user-create');

    return new UserResponse(u);

}