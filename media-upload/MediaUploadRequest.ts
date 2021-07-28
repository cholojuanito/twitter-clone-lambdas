export class MediaUploadRequest {
    public encodedMedia:string;
    public userId:string;
    public mimeType:string;
    public extension:string;

    constructor(encodedMedia:string, userId:string, mimeType:string, extension:string) {
        this.encodedMedia = encodedMedia;
        this.userId = userId;
        this.mimeType = mimeType;
        this.extension = extension;
    }
}