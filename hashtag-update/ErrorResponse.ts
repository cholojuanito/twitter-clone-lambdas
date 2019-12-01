export class ErrorResponse {
    public message:string;
    public statusCode:number;

    constructor(m:string, c:number) {
        this.message = m;
        this.statusCode = c;
    }
}