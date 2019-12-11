export interface QueueService {
    addToReadFollowersQueue(authorAlias:string, created:number):Promise<boolean>;
}