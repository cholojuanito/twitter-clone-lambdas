import { UserUpdateRequest, UserUpdateAction, UserUpdates } from "./UserUpdateRequest";
import UserResponse from "./UserResponse";
import User from "./User";
import { Media, MediaType } from "./Media";


export const handler = async (event: UserUpdateRequest): Promise<UserResponse> => {

    console.log('Entering user-update');
    
    if (event.action == UserUpdateAction.Replace) {
        console.log(`Finding user with id ${event.id}`);

    }

    console.log('Leaving user-update');

    let u = new User(event.id, "my-alias", "Tanner Davis", new Media(event.value.profilePicPath, MediaType.Image));

    return new UserResponse(u);

}