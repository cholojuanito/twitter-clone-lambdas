class UserCollectionFollowingGetRequest {
    public userId:string;
    public pageSize:number;
    public lastKey:string;
    
    constructor (userId:string, pageSize:number, lastKey:string) {
        this.userId = userId;
        this.pageSize = pageSize;
        this.lastKey = lastKey;
    }
}

export default UserCollectionFollowingGetRequest;