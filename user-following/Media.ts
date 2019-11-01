class Media {
    private path:string;
    private type:MediaType;

    constructor(path:string, type:string) {
        this.path = path;
        if (type == "image") {
            this.type = MediaType.Image;
        }
        else {
            this.type = MediaType.Video;
        }
    }
}

enum MediaType {
    Image = "image",
    Video = "video"
}

export { Media, MediaType };