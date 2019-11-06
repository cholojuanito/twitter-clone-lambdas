import UserGetAliasRequest from "./UserGetAliasRequest";
import UserResponse from "./UserResponse";
import User from "./User";
import { Media, MediaType } from "./Media";

export const handler = async (event: UserGetAliasRequest): Promise<UserResponse> => {

    console.log('Entering user-get')

    let u = new User('0miJZZ9DdhQWOnRguB4MCvfe0KV2', 'cholojuanito', 'Tanner Davis', new Media('assets/images/default_profile.png', MediaType.Image));
    let u1 = new User('u_abc', 'dos-dos', 'Sr. Dos', new Media('assets/images/default_profile.png', MediaType.Image));
    let u2 = new User('u_def', 'tres', 'Numba three!', new Media('https://i.imgur.com/I80W1Q0.png', MediaType.Image));
    let u3 = new User('u_293043', 'user3', 'Name 3', new Media('assets/images/default_profile.png', MediaType.Image));
    let u4 = new User('u_djlka192', 'user4', 'Name 4', new Media('https://i.imgur.com/I80W1Q0.png', MediaType.Image));
    let u5 = new User('u_jdaklk3u7', 'user5', 'Num 5', new Media('https://i.imgur.com/I80W1Q0.png', MediaType.Image));
    let u6 = new User('u_aaaaaa', 'user6', 'Sixes!', new Media('assets/images/default_profile.png', MediaType.Image));
    let u7 = new User('u_bbbb21', 'user7', 'What', new Media('https://i.imgur.com/I80W1Q0.png', MediaType.Image));
    let u8 = new User('u_9938kkkk', 'theocho', 'Ocho-ocho', new Media('assets/images/default_profile.png', MediaType.Image));
    let u9 = new User('u_39kkdh', 'nein', 'Nein-nein-nein', new Media('https://i.imgur.com/I80W1Q0.png', MediaType.Image));

    let ret:User = null;
    switch (event.alias) {
        case u.alias:
            ret = u;
            break;
        case u1.alias:
            ret = u1;
            break;
        case u2.alias:
            ret = u2;
            break;
        case u3.alias:
            ret = u3;
            break;
        case u4.alias:
            ret = u4;
            break;
        case u5.alias:
            ret = u5;
            break;
        case u6.alias:
            ret = u6;
            break;
        case u7.alias:
            ret = u7;
            break;
        case u8.alias:
            ret = u8;
            break;
        case u9.alias:
            ret = u9;
            break;
        default:
            break;
    }

    console.log('Leaving user-get');

    return new UserResponse(ret);

}