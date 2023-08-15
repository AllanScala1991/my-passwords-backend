import { EncrypterModel } from "../../models/encrypter/encrypter.model";
import { UserLogin } from "../../models/login/login";
import { ResponseModel } from "../../models/response/response.model";
import { TokenModel } from "../../models/token/token.model";
import { UserRepository } from "../../repositories/user/user.repository";
export declare class LoginService {
    private userRepository;
    private encrypter;
    private authentication;
    constructor(userRepository: UserRepository, encrypter: EncrypterModel, authentication: TokenModel);
    handle(user: UserLogin): Promise<ResponseModel>;
}
