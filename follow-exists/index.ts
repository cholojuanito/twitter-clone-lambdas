
import Follow from "./Follow";
import FollowExistsRequest from "./FollowExistsRequest";
import FollowResponse from "./FollowResponse";

export const handler = async (event: FollowExistsRequest): Promise<FollowResponse> => {

    let mainId = '0miJZZ9DdhQWOnRguB4MCvfe0KV2';
    let id2 = 'u_abc';
    let id3 = 'u_def';
    let id4 = 'u_293043';
    let id5 = 'u_djlka192';
    let id6 = 'u_jdaklk3u7';
    let id7 = 'u_bbbb21';
    let id8 = 'u_9938kkkk';
    let id9 = 'u_39kkdh';
    console.log('Entering follow-exists')

    let f:Follow = null;
    if (event.followerId == mainId) {
        switch (event.followeeId) {
            case id2:
            f = new Follow("f_1", mainId, id2, true, Date.now().toString());                
                break;
            case id3:
            f = new Follow("f_2", mainId, id3, true, Date.now().toString());                
                break;
            case id4:
            f = new Follow("f_3", mainId, id4, true, Date.now().toString());                
                break;
            case id5:
            f = new Follow("f_4", mainId, id5, true, Date.now().toString());                
                break;
            case id6:
            f = new Follow("f_5", mainId, id6, true, Date.now().toString());                
                break;
            case id7:
            f = new Follow("f_6", mainId, id7, true, Date.now().toString());                
                break;
            case id8:
            f = new Follow("f_7", mainId, id8, true, Date.now().toString());                
                break;
            case id9:
            f = new Follow("f_8", mainId, id9, true, Date.now().toString());                
                break;
        
            default:
                break;
        }
    }
    else if (event.followeeId == mainId) {
        switch (event.followerId) {
            case id2:
            f = new Follow("f_10", id2, mainId, true, Date.now().toString());                
                break;
            case id3:
            f = new Follow("f_11", id3, mainId, true, Date.now().toString());                
                break;
            case id4:
            f = new Follow("f_12", id4, mainId, true, Date.now().toString());                
                break;
            case id5:
            f = new Follow("f_13", id5, mainId, true, Date.now().toString());                
                break;
            case id7:
            f = new Follow("f_15", id7, mainId, true, Date.now().toString());                
                break;
            case id9:
            f = new Follow("f_17", id9, mainId, false, Date.now().toString());                
                break;
            case id8:
            case id6:
            default:
                break;
        }
    }

    console.log('Leaving follow-exists');

    return new FollowResponse(f);

}