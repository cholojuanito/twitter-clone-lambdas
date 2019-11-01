import UserCollectionFollowingGetRequest from "./UserCollectionFollowGetRequest";
import UserCollectionResponse from "./UserCollectionResponse";

export const handler = async (event: UserCollectionFollowingGetRequest): Promise<UserCollectionResponse> => {

    console.log('Entering followers-get')

    console.log('Leaving followers-get');

    return new UserCollectionResponse([], event.pageSize);

}