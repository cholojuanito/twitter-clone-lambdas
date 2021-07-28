export interface FeedDAO {
    batchAdd(aliases:string[], created:number, authorAlias:string):Promise<boolean>;
    add(alias:string, created:number, authorAlias:string):Promise<boolean>;
}