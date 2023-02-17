import * as express from "express";
import { json } from "stream/consumers";
import { ApiError } from "../exceptions/ApiError";

export function errorMiddleware(
    error: Error,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) 
{
    if(error instanceof ApiError){
        return response.status(error.status).json({message: error.message, errors: error.errors})
    }

    return response.status(500).json(error);
}