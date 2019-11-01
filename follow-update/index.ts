import { FollowUpdateRequest, FollowUpdates, FollowUpdateAction } from "./FollowUpdateRequest";
import FollowResponse from "./FollowResponse";
import Follow from "./Follow";


export const handler = async (event: FollowUpdateRequest): Promise<FollowResponse> => {

    console.log('Entering follow-update')

    let f:Follow;

    console.log(`Finding follow with id ${event.id}`);
    
    if (event.action == FollowUpdateAction.Follow) {
        f= new Follow("f_123456", "u_1233213knl21", "u_1233213knl21", true, Date.now().toString());
    }
    else {
        f = new Follow("f_123456", "u_1233213knl21", "u_1233213knl21", false, Date.now().toString());
    }


    console.log('Leaving follow-update');

    return new FollowResponse(f);

}