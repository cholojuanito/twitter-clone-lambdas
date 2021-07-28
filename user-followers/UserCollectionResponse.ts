import User from "./User";

class UserCollectionResponse {
    public data:User[];
    public numResults:number;
    public lastKey:Object;
    public pageSize:number;

    constructor(data:User[], pageSize:number, lastKey:Object) {
        this.data = data;
        this.pageSize = pageSize;
        this.numResults = data.length;
        if (lastKey == null || lastKey == undefined) {
            this.lastKey = null;
        }
        else {
            this.lastKey = lastKey;
        }
    }
}

export default UserCollectionResponse;