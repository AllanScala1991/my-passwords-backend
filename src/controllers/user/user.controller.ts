import { Request, Response } from "express";
import { EncrypterModel } from "../../models/encrypter/encrypter.model";
import { UserRepository } from "../../repositories/user/user.repository";
import { UserService } from "../../services/user/user.service";
import { Bcrypt } from "../../utils/bcrypt/bcrypt";
import { CreateUserModel } from "../../models/user/user.model";
import { UUIDModel } from "../../models/uuid/uuid";
import { KeyService } from "../../services/key/key.service";
import { KeyModel } from "../../models/keys/keys";
import { KeyRepository } from "../../repositories/key/key.repository";
import { UUID } from "../../utils/uuid/uuid";

export class UserController {
    private userRepository: UserRepository;
    private encrypter: EncrypterModel;
    private userService: UserService;
    private keyService: KeyService;
    private keyRepository: KeyModel;
    private uuidService: UUIDModel

    constructor(){
        this.userRepository = new UserRepository();
        this.encrypter = new Bcrypt();
        this.keyRepository = new KeyRepository();
        this.uuidService = new UUID();
        this.keyService = new KeyService(this.keyRepository, this.uuidService);
        this.userService = new UserService(this.encrypter, this.userRepository, this.keyService);
    }

    async createNewUser(req: Request, res: Response) {
        try {
            const user: CreateUserModel = req.body;

            const response = await this.userService.createNewUser(user);

            return res.status(response.status).json(response);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async updateUserById(req: Request, res: Response) {
        try {
            const { id, name, email, username,  password } = req.body;

            const response = await this.userService.updateUser(id, {name, email, username, password});

            return res.status(response.status).json(response);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async deleteUserById(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const response = await this.userService.deleteUser(id);

            return res.status(response.status).json(response);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}