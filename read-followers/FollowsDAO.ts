export interface FollowsDAO {
    getFollowers(alias:string):Promise<string[]>;
    getFollowees(alias:string):Promise<string[]>;
}