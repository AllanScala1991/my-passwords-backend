import { Request, Response } from "express";
import { UUIDModel } from "../../models/uuid/uuid";
import { KeyRepository } from "../../repositories/key/key.repository";
import { KeyService } from "../../services/key/key.service";
import { UUID } from "../../utils/uuid/uuid";
import { CreatePasswordModel } from "../../models/password/password";
import { PasswordService } from "../../services/password/password.service";
import { CryptographyModel } from "../../models/cryptography/cryptography";
import { PasswordRepository } from "../../repositories/password/password.repository";
import { Crypto } from "../../utils/crypto/crypto";

export class PasswordController {
    private passwordRepository: PasswordRepository;
    private cryptoService: CryptographyModel;
    private keyRepository: KeyRepository;
    private uuidService: UUIDModel;
    private keyService: KeyService;
    private passwordService: PasswordService;

    constructor() {
        this.passwordRepository = new PasswordRepository();
        this.cryptoService = new Crypto();
        this.keyRepository = new KeyRepository();
        this.uuidService = new UUID();
        this.keyService = new KeyService(this.keyRepository, this.uuidService);
        this.passwordService = new PasswordService(this.passwordRepository, this.cryptoService, this.keyService);
    }

    async createNewPassword(req: Request, res: Response) {
        try {
            const data: CreatePasswordModel = req.body;

            const response = await this.passwordService.create(data);

            res.status(response.status).json(response);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async updatePasswordById(req: Request, res: Response) {
        try {
            const {id, userId, title, username, password, updatedAt} = req.body;

            const response = await this.passwordService.updateById(id, {userId, title, username, password, updatedAt});

            res.status(response.status).json(response);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async findPasswordByTitle(req: Request, res: Response) {
        try {
            const title = req.params.title;
    
            const response = await this.passwordService.findByTitle(title);
    
            res.status(response.status).json(response);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async findPasswordsByUserId(req: Request, res: Response) {
        try {
            const userId = req.params.userId;

            const response = await this.passwordService.findAllPasswordByUserId(userId);

            res.status(response.status).json(response);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async deletePasswordById(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const response = await this.passwordService.deleteById(id);

            res.status(response.status).json(response);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async showUserPasswordById(req: Request, res: Response) {
        try {
            const {userId, passwordId} = req.body;

            const response = await this.passwordService.showPassword(userId, passwordId);

            res.status(response.status).json(response);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}