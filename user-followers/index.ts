import UserCollectionFollowingGetRequest from "./UserCollectionFollowGetRequest";
import UserCollectionResponse from "./UserCollectionResponse";
import { Media, MediaType } from "./Media";
import User from "./User";

export const handler = async (event: UserCollectionFollowingGetRequest): Promise<UserCollectionResponse> => {

    console.log('Entering followers-get')
    
    // Gets users that are currently following the asking-user
    let u1 = new User('u_abc', 'dos-dos', 'Sr. Dos', new Media('assets/images/default_profile.png', MediaType.Image));
    let u3 = new User('u_293043', 'user3', 'Name 3', new Media('assets/images/default_profile.png', MediaType.Image));
    let u4 = new User('u_djlka192', 'user4', 'Name 4', new Media('https://i.imgur.com/I80W1Q0.png', MediaType.Image));
    let u5 = new User('u_jdaklk3u7', 'user5', 'Num 5', new Media('https://i.imgur.com/I80W1Q0.png', MediaType.Image));
    let u6 = new User('u_aaaaaa', 'user6', 'Sixes!', new Media('assets/images/default_profile.png', MediaType.Image));
    let u7 = new User('u_bbbb21', 'user7', 'What', new Media('https://i.imgur.com/I80W1Q0.png', MediaType.Image));

    console.log('Leaving followers-get');

    return new UserCollectionResponse([u1, u3, u4, u5, u6, u7], event.pageSize);

}