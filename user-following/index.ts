import UserCollectionFollowingGetRequest from "./UserCollectionFollowGetRequest";
import UserCollectionResponse from "./UserCollectionResponse";
import User from "./User";
import { Media, MediaType } from "./Media";

export const handler = async (event: UserCollectionFollowingGetRequest): Promise<UserCollectionResponse> => {

    console.log('Entering following-get')
    
    // Gets users that the asking-user is currently following
    let u1 = new User('u_abc', 'dos-dos', 'Sr. Dos', new Media('assets/images/default_profile.png', MediaType.Image));
    let u2 = new User('u_def', 'tres', 'Numba three!', new Media('https://i.imgur.com/I80W1Q0.png', MediaType.Image));
    let u3 = new User('u_293043', 'user3', 'Name 3', new Media('assets/images/default_profile.png', MediaType.Image));
    let u4 = new User('u_djlka192', 'user4', 'Name 4', new Media('https://i.imgur.com/I80W1Q0.png', MediaType.Image));
    let u5 = new User('u_jdaklk3u7', 'user5', 'Num 5', new Media('https://i.imgur.com/I80W1Q0.png', MediaType.Image));
    let u6 = new User('u_aaaaaa', 'user6', 'Sixes!', new Media('assets/images/default_profile.png', MediaType.Image));
    let u7 = new User('u_bbbb21', 'user7', 'What', new Media('https://i.imgur.com/I80W1Q0.png', MediaType.Image));
    let u8 = new User('u_9938kkkk', 'theocho', 'Ocho-ocho', new Media('assets/images/default_profile.png', MediaType.Image));
    let u9 = new User('u_39kkdh', 'nein', 'Nein-nein-nein', new Media('https://i.imgur.com/I80W1Q0.png', MediaType.Image));

    console.log('Leaving following-get');

    return new UserCollectionResponse([u1, u2, u3, u4, u5, u6, u7, u8, u9], event.pageSize);

}