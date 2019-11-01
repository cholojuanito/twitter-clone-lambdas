import UserGetRequest from "./UserGetRequest";
import UserResponse from "./UserResponse";
import User from "./User";
import { Media, MediaType } from "./Media";

export const handler = async (event: UserGetRequest): Promise<UserResponse> => {

    console.log('Entering user-get')

    console.log('Leaving user-get');

    let u = new User("u_1233213knl21", "my-alias", "Tanner Davis", new Media("some-path", MediaType.Image));

    return new UserResponse(u);

}