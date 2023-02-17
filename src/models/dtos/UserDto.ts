export class UserDto {
    _id: string;
    name: string;
    avatar: string;
    email: string;
    password: string;

    constructor(_id: string, name: string, avatar: string, email: string, password: string){
        this._id = _id;
        this.name = name;
        this.avatar = avatar;
        this.email = email;
        this.password = password;
    }
}