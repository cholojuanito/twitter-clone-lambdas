export interface QueueService {
    addToFeedQueue(authorAlias:string, created:string, items:string[]):Promise<boolean>;
}