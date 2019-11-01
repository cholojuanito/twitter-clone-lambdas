class Follow {
    public id:string;
    public followerId:string;
    public followeeId:string;
    public isActive:boolean;
    public startDate:string;

    constructor(id:string, followerId:string, followeeId:string, isActive:boolean, startDate:string) {
        this.id = id;
        this.followerId = followerId;
        this.followeeId = followeeId;
        this.isActive = isActive;
        this.startDate = startDate;
    }
}

export default Follow;