class UserCollectionFollowingGetRequest {
    public userId:string;
    public pageSize:number;
    public lastKey:Object;
    
    constructor (userId:string, pageSize:number, lastKey:Object) {
        this.userId = userId;
        this.pageSize = pageSize;
        this.lastKey = lastKey;
    }
}

export default UserCollectionFollowingGetRequest;