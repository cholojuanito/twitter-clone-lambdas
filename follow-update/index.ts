import { FollowUpdateRequest, FollowUpdates, FollowUpdateAction } from "./FollowUpdateRequest";
import FollowResponse from "./FollowResponse";
import Follow from "./Follow";


export const handler = async (event: FollowUpdateRequest): Promise<FollowResponse> => {

    console.log('Entering follow-update')

    let id1 = 'f_1';
    let id2 = 'f_2';
    let id3 = 'f_3';
    let id4 = 'f_4';
    let id5 = 'f_5';
    let id6 = 'f_6';
    let id7 = 'f_7';
    let id8 = 'f_8';
    let id10 = 'f_10';
    let id11 = 'f_11';
    let id12 = 'f_12';
    let id13 = 'f_13';
    let id15 = 'f_15';
    let id17 = 'f_17';
    let uId1 = '0miJZZ9DdhQWOnRguB4MCvfe0KV2';
    let uId2 = 'u_abc';
    let uId3 = 'u_def';
    let uId4 = 'u_293043';
    let uId5 = 'u_djlka192';
    let uId6 = 'u_jdaklk3u7';
    let uId7 = 'u_bbbb21';
    let uId8 = 'u_9938kkkk';
    let uId9 = 'u_39kkdh';
    let f:Follow = null;

    console.log(`Finding follow with id ${event.id}`);
    
    if (event.action == FollowUpdateAction.Follow) {
        switch (event.id) {
            case id1:
            f = new Follow(id1, uId1, uId2, true, Date.now().toString());                
                break;
            case id2:
            f = new Follow(id2, uId1, uId3, true, Date.now().toString());                
                break;
            case id3:
            f = new Follow(id3, uId1, uId4, true, Date.now().toString());                
                break;
            case id4:
            f = new Follow(id4, uId1, uId5, true, Date.now().toString());                
                break;
            case id5:
            f = new Follow(id5, uId1, uId6, true, Date.now().toString());                
                break;
            case id6:
            f = new Follow(id6, uId1, uId7, true, Date.now().toString());                
                break;
            case id7:
            f = new Follow(id7, uId1, uId8, true, Date.now().toString());                
                break;
            case id8:
            f = new Follow(id8, uId1, uId9, true, Date.now().toString());                
                break;

            //   uId1 is the one being followed now
            case id10:
            f = new Follow(id10, uId2, uId1, true, Date.now().toString());                
                break;
            case id11:
            f = new Follow(id11, uId3, uId1, true, Date.now().toString());                
                break;
            case id12:
            f = new Follow(id12, uId4, uId1, true, Date.now().toString());                
                break;
            case id13:
            f = new Follow(id13, uId5, uId1, true, Date.now().toString());                
                break;
            case id15:
            f = new Follow(id15, uId7, uId1, true, Date.now().toString());                
                break;
            case id17:
            f = new Follow(id17, uId9, uId1, true, Date.now().toString());                
                break;
        
            default:
                break;
        }
    }
    else {
        switch (event.id) {
            case id1:
            f = new Follow(id1, uId1, uId2, false, Date.now().toString());                
                break;
            case id2:
            f = new Follow(id2, uId1, uId3, false, Date.now().toString());                
                break;
            case id3:
            f = new Follow(id3, uId1, uId4, false, Date.now().toString());                
                break;
            case id4:
            f = new Follow(id4, uId1, uId5, false, Date.now().toString());                
                break;
            case id5:
            f = new Follow(id5, uId1, uId6, false, Date.now().toString());                
                break;
            case id6:
            f = new Follow(id6, uId1, uId7, false, Date.now().toString());                
                break;
            case id7:
            f = new Follow(id7, uId1, uId8, false, Date.now().toString());                
                break;
            case id8:
            f = new Follow(id8, uId1, uId9, false, Date.now().toString());                
                break;

            //   uId1 is the one being followed now
            case id10:
            f = new Follow(id10, uId2, uId1, false, Date.now().toString());                
                break;
            case id11:
            f = new Follow(id11, uId3, uId1, false, Date.now().toString());                
                break;
            case id12:
            f = new Follow(id12, uId4, uId1, false, Date.now().toString());                
                break;
            case id13:
            f = new Follow(id13, uId5, uId1, false, Date.now().toString());                
                break;
            case id15:
            f = new Follow(id15, uId7, uId1, false, Date.now().toString());                
                break;
            case id17:
            f = new Follow(id17, uId9, uId1, false, Date.now().toString());                
                break;
        
            default:
                break;
        }
    }


    console.log('Leaving follow-update');

    return new FollowResponse(f);

}