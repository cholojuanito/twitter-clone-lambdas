import ExternalURL from "../entities/ExternalURL";
import Mention from "../entities/Mention";
import Hashtag from "../entities/Hashtag";
import { Media } from "../entities/Media";

class TweetCreateRequest {
    public authorId:string;
    public message:string;
    public media:Media;
    public hashtags:Hashtag[];
    public mentions:Mention[];
    public urls:ExternalURL[];

    constructor(id:string, message:string, media:Media, hashtags:Hashtag[], mentions:Mention[], urls:ExternalURL[]) {
        this.authorId = id;
        this.message = message;
        this.media = media;
        this.hashtags = hashtags;
        this.mentions = mentions;
        this.urls = urls;
    }
}

export default TweetCreateRequest;