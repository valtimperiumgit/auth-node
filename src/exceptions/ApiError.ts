import { ValidationError } from "express-validator";

export class ApiError extends Error{
    status: number;
    message: string;
    errors: Error[] | ValidationError[];

    constructor(status: number, message: string, errors: Error[] | ValidationError[] = []){
        super();
        this.status = status;
        this.errors = errors;
        this.message = message;
    }

    static Unauthorized(){
        return new ApiError(401, "User unauthorized");
    }

    static BadRequest(message: string, errors: Error[] | ValidationError[] = []){
        return new ApiError(400, message, errors);
    }
}