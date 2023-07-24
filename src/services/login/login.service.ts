import { EncrypterModel } from "../../models/encrypter/encrypter.model";
import { UserLogin } from "../../models/login/login";
import { ResponseModel } from "../../models/response/response.model";
import { TokenModel } from "../../models/token/token.model";
import { UserRepository } from "../../repositories/user/user.repository";

export class LoginService {
    constructor(
        private userRepository: UserRepository, 
        private encrypter: EncrypterModel,
        private authentication: TokenModel
        ){};

    async handle(user: UserLogin): Promise<ResponseModel> {
        let isPayloadEmpty = false;

        for(let index in user){
            if(!user[index]) {
                isPayloadEmpty = true;
                break;
            }
        }

        if(isPayloadEmpty === true) return {status: 400, message: "Os campos de username e senha são obrigatórios."};

        const isUserExists = await this.userRepository.findUserByUsername(user.username);

        if(isUserExists == null) return {status: 400, message: "Usuário ou Senha incorretos."};

        const isValidPassword = await this.encrypter.compare({current: user.password, hash: isUserExists.password});

        if(!isValidPassword) return {status: 400, message: "Usuário ou Senha incorretos."}; 

        const token = await this.authentication.generate({id: isUserExists.id, name: isUserExists.name});

        return {status: 200, data: {token: token}};
    }
}