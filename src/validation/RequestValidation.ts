import { validationResult } from "express-validator";
import * as express from "express";
import { IUser } from "../models/entities/User";
import { ApiError } from "../exceptions/ApiError";

export const validateRequest = (request: express.Request<any>, response: express.Response) => {
    const errors = validationResult(request);

    if(!errors.isEmpty())
    {
        throw ApiError.BadRequest("Validation error.", errors.array());
    }
}