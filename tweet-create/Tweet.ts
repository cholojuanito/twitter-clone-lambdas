import Mention from "./Mention";
import Hashtag from "./Hashtag";
import ExternalURL from "./ExternalURL";
import { Media } from "./Media";

class Tweet {
    public id:string;
    public authorId:string;
    public message:string;
    public media:Media;
    public hashtags:Hashtag[];
    public mentions:Mention[];
    public urls:ExternalURL[];
    public created:number;

    constructor(id:string, authorId:string, message:string, media:Media, hashtags:Hashtag[], mentions:Mention[], urls:ExternalURL[], created:number) {
        this.id = id;
        this.authorId = authorId;
        this.message = message;
        this.media = media;
        this.hashtags = hashtags;
        this.mentions = mentions;
        this.urls = urls;
        this.created = created;
    }
}

export default Tweet;