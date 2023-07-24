import { Request, Response } from "express";
import { EncrypterModel } from "../../models/encrypter/encrypter.model";
import { TokenModel } from "../../models/token/token.model";
import { UserRepository } from "../../repositories/user/user.repository";
import { LoginService } from "../../services/login/login.service";
import { Bcrypt } from "../../utils/bcrypt/bcrypt";
import { JsonWebToken } from "../../utils/jsonwebtoken/jsonwebtoken";
import { UserLogin } from "../../models/login/login";

export class LoginController {
    private userRepository: UserRepository;
    private encrypter: EncrypterModel;
    private authentication: TokenModel;
    private loginService: LoginService;

    constructor(){
        this.userRepository = new UserRepository();
        this.encrypter = new Bcrypt();
        this.authentication = new JsonWebToken();
        this.loginService = new LoginService(this.userRepository, this.encrypter, this.authentication);
    }

    async handle(req: Request, res: Response) {
        try {
            const userLogin: UserLogin = req.body;

            const response = await this.loginService.handle(userLogin);

            return res.status(response.status).json(response);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}