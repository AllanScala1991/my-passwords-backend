import { CryptographyModel } from "../../models/cryptography/cryptography";
import { CreatePasswordModel } from "../../models/password/password";
import { ResponseModel } from "../../models/response/response.model";
import { PasswordRepository } from "../../repositories/password/password.repository";
import { KeyService } from "../key/key.service";
export declare class PasswordService {
    private passwordRepository;
    private cryptoService;
    private keyService;
    constructor(passwordRepository: PasswordRepository, cryptoService: CryptographyModel, keyService: KeyService);
    create(data: CreatePasswordModel): Promise<ResponseModel>;
    updateById(id: string, data: CreatePasswordModel): Promise<ResponseModel>;
    findByTitle(title: string): Promise<ResponseModel>;
    findAllPasswordByUserId(userId: any): Promise<ResponseModel>;
    deleteById(id: string): Promise<ResponseModel>;
    showPassword(userId: string, passwordId: string): Promise<ResponseModel>;
}
