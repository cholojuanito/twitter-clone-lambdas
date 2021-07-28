export interface HashtagDAO {
    batchAdd(hashtags:string[], created:number, authorAlias:string):Promise<boolean>;
    add(hashtag:string, created:number, authorAlias:string):Promise<boolean>;
}