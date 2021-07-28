import User from "../entities/User";

class UserCollectionResponse {
    public data:User[];
    public numResults:number;
    public lastKey:string;
    public pageSize:number;

    constructor(data:User[], pageSize:number) {
        this.data = data;
        this.pageSize = pageSize;
        this.numResults = data.length;
        if (data.length > 0) {
            this.lastKey = data[data.length - 1].id;
        }
        else {
            this.lastKey = null; 
        }
    }
}

export default UserCollectionResponse;