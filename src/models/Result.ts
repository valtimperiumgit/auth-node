import { CustomError } from "./CustomError";

export class Result{

    value: any;
    isSuccess: boolean = true;
    isFailure: boolean = !this.isSuccess;
    error: CustomError = CustomError.none;

    constructor(isSuccess: boolean, error: CustomError, value?: any)
    {
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error;
        this.value = value;
    }

    static failure(error: CustomError) { return new Result(false, error) };

    static success(value?: any) { return new Result(true, CustomError.none, value) };
}