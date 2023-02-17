import jwt from "jsonwebtoken";
import { ApiError } from "../exceptions/ApiError";
import Token from "../models/entities/Token";
import User from "../models/entities/User";

class TokenService{

    generateTokens(user: object){

        if(process.env.JWT_ACCESS_SECRET_KEY && process.env.JWT_REFRESH_SECRET_KEY){

            const accessToken = jwt.sign({user}, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '30m'});
            const refreshToken = jwt.sign({user}, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '30d'});

            return {accessToken: accessToken, refreshToken: refreshToken};
        }
    }

    async saveToken(userId: string, refreshToken: string){
        const existingToken = await Token.findOne({"userId": userId});
        
        if(existingToken){
            existingToken.refreshToken = refreshToken;
            return existingToken.save();
        }

        const token = await Token.create({userId: userId, refreshToken: refreshToken});
        return token;
    }

    async refresh(refreshToken: string){

        if(!refreshToken){
            throw ApiError.Unauthorized();
        }
        
        const token = await Token.findOne({"refreshToken": refreshToken});

        if(!this.validateRefreshToken(refreshToken) && !token){
            throw ApiError.Unauthorized();
        }

        const user = await User.findOne({"userId": token?.userId});

        if(user){
            const newTokens = await this.generateTokens(user);

            if(newTokens){
                await this.saveToken(user._id, newTokens.refreshToken);
            }  

            return newTokens;
        }
    }

    validateRefreshToken(refreshToken: string){
        if(process.env.JWT_REFRESH_SECRET_KEY){
            return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
        }
    }

    validateAccessToken(accessToken: string){
        if(process.env.JWT_ACCESS_SECRET_KEY){
            return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY);
        }
    }

}

export default new TokenService();