export class CustomError{
    static none: CustomError = new CustomError(0, "");
    code: number = 500;
    message: string = "";

    constructor(code: number, message: string){
        this.code = code;
        this.message = message;
    }
}