import * as express from 'express';
import { json } from 'stream/consumers';
import { ApiError } from '../exceptions/ApiError';
import { IUser } from '../models/entities/User';
import TokenService from '../services/TokenService';
import UserService from '../services/UserService';
import { validateRequest } from '../validation/RequestValidation';


class AuthorizationController {

async login(request: express.Request<{email: string, password: string}>, response: express.Response, next: express.NextFunction){

    try{
        validateRequest(request, response);

        const loginResponse = await UserService.login(request.body.email, request.body.password);

        response.cookie("refreshToken", loginResponse.tokens?.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})

        return response.json(loginResponse);
    }
    catch(e){
        next(e);
    }
}

async registration(request: express.Request<IUser>, response: express.Response, next: express.NextFunction)
{
    try{
        validateRequest(request, response);

        const password = request.body.password;

        await UserService.create(request.body);

        const loginResponse = await UserService.login(request.body.email, password);
        
        response.cookie("refreshToken", loginResponse.tokens?.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})

        return response.json(loginResponse);
    }
    catch(e){
        next(e);
    }
}

async refresh(request: express.Request, response: express.Response, next: express.NextFunction){
    try{

        const refreshResponse = await TokenService.refresh(request.cookies["refreshToken"]);
        response.cookie("refreshToken", refreshResponse?.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})

        return response.json(refreshResponse);
    }
    catch(e){
        next(e);
    }
}

async test(request: express.Request, response: express.Response, next: express.NextFunction){
    try{

        const user = request.cookies["user"];
        return response.json(user);
    }
    catch(e){
        next(e);
    }
}


}

export default new AuthorizationController();