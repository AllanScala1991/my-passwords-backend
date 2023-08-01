import { CryptographyModel } from "../../models/cryptography/cryptography";
import { CreatePasswordModel } from "../../models/password/password";
import { ResponseModel } from "../../models/response/response.model";
import { PasswordRepository } from "../../repositories/password/password.repository";
import { KeyService } from "../key/key.service";

export class PasswordService {
    constructor(
        private passwordRepository: PasswordRepository,
        private cryptoService: CryptographyModel,
        private keyService: KeyService
    ){}

    async create(data: CreatePasswordModel): Promise<ResponseModel> {
        if(!data.userId || !data.title || !data.username || !data.password) {
            return {status: 400, message: "Todos os campos devem ser preenchidos."}
        }

        const user = await this.keyService.findKeyByUserId(data.userId);
        const passwordCryptography = await this.cryptoService.createCryptography(data.password, user.key, Buffer.from(user.vetor, "utf-8"));

        data.password = passwordCryptography.passwordEncrypted;

        const createPassword = await this.passwordRepository.create(data);

        delete createPassword.password;

        return {status: 201, data: createPassword}
    }

    async updateById(id: string, data: CreatePasswordModel): Promise<ResponseModel>{
        if(!id || !data.userId || !data.title || !data.username || !data.password) {
            return {status: 400, message: "Todos os campos devem ser preenchidos."}
        }

        const isPasswordExists = await this.passwordRepository.findPasswordById(id);

        if(isPasswordExists == null) return {status: 404, message: "Registro de senha não localizado."};

        const user = await this.keyService.findKeyByUserId(data.userId);
        const crypto = await this.cryptoService.createCryptography(data.password, user.key, Buffer.from(user.vetor, "utf-8"));
        data.password = crypto.passwordEncrypted;
        data.updatedAt = new Date();

        await this.passwordRepository.updatePassword(id, data);

        return {status: 200, message: "Registro atualizado com sucesso."}
    }

    async findByTitle(title: string): Promise<ResponseModel>{
        if(!title) return {status: 400, message: "Todos os campos devem ser preenchidos."};

        const passwords = await this.passwordRepository.findPasswordByTitle(title);

        if(passwords.length <= 0) return {status: 404, message: "Nenhum registro localizado."};

        for(let data of passwords) {
            delete data.password
        }

        return {status: 200, data: passwords}
    }

    async findAllPasswordByUserId(userId): Promise<ResponseModel> {
        if(!userId) return {status: 400, message: "ID inválido."}

        const passwords = await this.passwordRepository.findAllPasswordsByUserId(userId);

        if(passwords.length <= 0) return {status: 404, message: "Nenhum registro localizado."}

        return {status: 200, data: passwords}
    }

    async deleteById(id: string): Promise<ResponseModel>{
        if(!id) return {status: 400, message: "ID inválido."}

        const isPasswordExists = await this.passwordRepository.findPasswordById(id);

        if(isPasswordExists == null) return {status: 404, message: "Registro de senha não localizado."};

        await this.passwordRepository.deletePasswordById(id);

        return{status: 200, message: "Registro deletado com sucesso."}
    }

    async showPassword(userId: string, passwordId: string): Promise<ResponseModel>{
        const userSecret = await this.keyService.findKeyByUserId(userId);
        const user = await this.passwordRepository.findPasswordById(passwordId);

        const decriptedPassword = await this.cryptoService.loadCryptography(user.password, userSecret.key, Buffer.from(userSecret.vetor, "utf-8"));

        return {status: 200, data: {decriptedPassword}}
    }
}