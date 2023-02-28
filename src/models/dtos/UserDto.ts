import { IUser } from "../entities/User";

export class UserDto {
    id: string;
    name: string;
    avatar: string;
    email: string;

    constructor({_id, name, avatar, email} : IUser){
        this.id = _id;
        this.name = name;
        this.avatar = avatar;
        this.email = email;
    }
}