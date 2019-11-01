import UserCollectionFollowingGetRequest from "./UserCollectionFollowGetRequest";
import UserCollectionResponse from "./UserCollectionResponse";

export const handler = async (event: UserCollectionFollowingGetRequest): Promise<UserCollectionResponse> => {

    console.log('Entering following-get')

    console.log('Leaving following-get');

    return new UserCollectionResponse([], event.pageSize);

}