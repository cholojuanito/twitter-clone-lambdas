import { UserUpdateRequest, UserUpdateAction, UserUpdates } from "./UserUpdateRequest";
import UserResponse from "./UserResponse";
import User from "./User";
import { Media, MediaType } from "./Media";


export const handler = async (event: UserUpdateRequest): Promise<UserResponse> => {

    console.log('Entering user-update');

    let u:User;
    
    if (event.action == UserUpdateAction.Replace) {
        console.log(`Finding user with id ${event.id}`);

        if (event.value.profilePicPath != null) {
            u = new User(event.id, 'cholojuanito', 'Tanner Davis', new Media(event.value.profilePicPath, MediaType.Image));
        }
        else {
            u = new User(event.id, 'cholojuanito', 'Tanner Davis', new Media('assets/images/default_profile.png', MediaType.Image));

        }

        // if (event.value) {

        // }
    }
    else {
        u = new User(event.id, 'cholojuanito', 'Tanner Davis', new Media('assets/images/default_profile.png', MediaType.Image));

    }

    console.log('Leaving user-update');

    return new UserResponse(u);

}