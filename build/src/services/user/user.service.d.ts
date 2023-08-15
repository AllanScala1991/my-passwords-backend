import { CryptographyModel } from "../../models/cryptography/cryptography";
import { EncrypterModel } from "../../models/encrypter/encrypter.model";
import { ResponseModel } from "../../models/response/response.model";
import { CreateUserModel } from "../../models/user/user.model";
import { UserRepository } from "../../repositories/user/user.repository";
import { KeyService } from "../key/key.service";
export declare class UserService {
    private encrypter;
    private userRepository;
    private keyService;
    private cryptoService;
    constructor(encrypter: EncrypterModel, userRepository: UserRepository, keyService: KeyService, cryptoService: CryptographyModel);
    createNewUser(user: CreateUserModel): Promise<ResponseModel>;
    updateUser(id: string, user: CreateUserModel): Promise<ResponseModel>;
    deleteUser(id: string): Promise<ResponseModel>;
}
