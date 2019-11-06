import { S3 } from 'aws-sdk';
import { MediaUploadRequest } from "./MediaUploadRequest";
import { MediaUploadResponse } from "./MediaUploadResponse";
import { v4 } from 'uuid';


export const handler = async (event: MediaUploadRequest): Promise<MediaUploadResponse> => {

    console.log('Entering media-upload')
    let bucket:string = 'twitter-clone-uploads';
    let s3 = new S3();
    let decoded = Buffer.from(event.encodedMedia, 'base64');
    let filePath = event.userId + '/' + v4() + event.extension;

    let params = {
        ACL: 'public-read',
        Body: decoded,
        Bucket: bucket,
        Key: filePath,
        ContentType: event.mimeType
    };

    let resp:MediaUploadResponse = null;
    let uploadResp = await s3.upload(params, (err:Error, data) => {
        if (err) {
            console.log(err.message);
            return err;
        }
    }).promise();

    if (uploadResp) {
        console.log(uploadResp.Location);
        resp = new MediaUploadResponse(uploadResp.Location);
    }

    console.log('Leaving media-upload');

    return resp;

}