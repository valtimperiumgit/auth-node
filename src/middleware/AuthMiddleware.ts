import * as express from "express";
import { json } from "stream/consumers";
import { ApiError } from "../exceptions/ApiError";
import TokenService from "../services/TokenService";

export function authMiddleware(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) 
{
    try{
        const authorizationHeader = request.headers.authorization;

        if(!authorizationHeader){
            return next(ApiError.Unauthorized());
        }

        const accessToken = authorizationHeader.split(' ')[1];

        if(!accessToken){
            return next(ApiError.Unauthorized());
        }

        const userData = TokenService.validateAccessToken(accessToken);

        request.cookies["user"] = userData;

        next();
    }
    catch(e){
        return next(ApiError.Unauthorized());
    }
}