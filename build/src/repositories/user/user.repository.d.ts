import { CreateUserModel, UserModel, UserModelResponse } from "../../models/user/user.model";
export declare class UserRepository implements UserModel {
    create(user: CreateUserModel): Promise<UserModelResponse>;
    findUserById(id: string): Promise<UserModelResponse>;
    findUserByUsername(username: string): Promise<UserModelResponse>;
    findUserByEmail(email: string): Promise<UserModelResponse>;
    updateUserById(id: string, user: CreateUserModel): Promise<UserModelResponse>;
    deleteUserById(id: string): Promise<void>;
}
