import User, { IUser } from "../models/entities/User";
import bcrypt from "bcrypt";
import { ApiError } from "../exceptions/ApiError";
import TokenService from "./TokenService";


class UserService {

    async create(user: IUser){
        await this.validateCreating(user);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await User.create(user);
    }

    async login(email: string, password: string){
        const user = await User.findOne({"email": email})

        console.log(user + " " + email);
        console.log(password);

        if(!user || !await bcrypt.compare(password, user.password))
        {   
            throw ApiError.BadRequest(`Incorrect email or password.`);
        }

        const tokens = await TokenService.generateTokens(user);

        if(tokens != undefined){
            await TokenService.saveToken(user._id, tokens.refreshToken);
        }

        return {user: user, tokens: tokens};
    }

    async validateCreating(user: IUser){

        const existingUser = await User.findOne({"email": user.email});

        if(existingUser)
        {   
            throw ApiError.BadRequest(`User with email ${existingUser.email} already exist.`);
        }
    }
}

export default new UserService();