
import Follow from "./Follow";
import FollowGetRequest from "./FollowGetRequest";
import FollowResponse from "./FollowResponse";

export const handler = async (event: FollowGetRequest): Promise<FollowResponse> => {

    console.log('Entering follow-get')

    let f = new Follow("f_123456", "u_1233213knl21", "u_1233213knl21", true, Date.now().toString());

    console.log('Leaving follow-get');

    return new FollowResponse(f);

}