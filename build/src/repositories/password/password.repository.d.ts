import { CreatePasswordModel, PasswordModel, PasswordResponseModel } from "../../models/password/password";
export declare class PasswordRepository implements PasswordModel {
    create(password: CreatePasswordModel): Promise<PasswordResponseModel>;
    updatePassword(id: string, password: CreatePasswordModel): Promise<PasswordResponseModel>;
    findPasswordByTitle(title: string): Promise<PasswordResponseModel[]>;
    findPasswordById(id: string): Promise<PasswordResponseModel>;
    findAllPasswordsByUserId(userId: string): Promise<PasswordResponseModel[]>;
    deletePasswordById(id: string): Promise<void>;
}
