"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
class PasswordService {
    constructor(passwordRepository, cryptoService, keyService) {
        this.passwordRepository = passwordRepository;
        this.cryptoService = cryptoService;
        this.keyService = keyService;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.userId || !data.title || !data.username || !data.password) {
                return { status: 400, message: "Todos os campos devem ser preenchidos." };
            }
            const user = yield this.keyService.findKeyByUserId(data.userId);
            const passwordCryptography = yield this.cryptoService.createCryptography(data.password, user.key, Buffer.from(user.vetor, "base64"));
            data.password = passwordCryptography.passwordEncrypted;
            const createPassword = yield this.passwordRepository.create(data);
            delete createPassword.password;
            return { status: 201, data: createPassword };
        });
    }
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || !data.userId || !data.title || !data.username || !data.password) {
                return { status: 400, message: "Todos os campos devem ser preenchidos." };
            }
            const isPasswordExists = yield this.passwordRepository.findPasswordById(id);
            if (isPasswordExists == null)
                return { status: 404, message: "Registro de senha não localizado." };
            const user = yield this.keyService.findKeyByUserId(data.userId);
            const crypto = yield this.cryptoService.createCryptography(data.password, user.key, Buffer.from(user.vetor, "base64"));
            data.password = crypto.passwordEncrypted;
            data.updatedAt = new Date();
            yield this.passwordRepository.updatePassword(id, data);
            return { status: 200, message: "Registro atualizado com sucesso." };
        });
    }
    findByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!title)
                return { status: 400, message: "Todos os campos devem ser preenchidos." };
            const passwords = yield this.passwordRepository.findPasswordByTitle(title);
            if (passwords.length <= 0)
                return { status: 404, message: "Nenhum registro localizado." };
            for (let data of passwords) {
                delete data.password;
            }
            return { status: 200, data: passwords };
        });
    }
    findAllPasswordByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId)
                return { status: 400, message: "ID inválido." };
            const passwords = yield this.passwordRepository.findAllPasswordsByUserId(userId);
            if (passwords.length <= 0)
                return { status: 404, message: "Nenhum registro localizado." };
            return { status: 200, data: passwords };
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                return { status: 400, message: "ID inválido." };
            const isPasswordExists = yield this.passwordRepository.findPasswordById(id);
            if (isPasswordExists == null)
                return { status: 404, message: "Registro de senha não localizado." };
            yield this.passwordRepository.deletePasswordById(id);
            return { status: 200, message: "Registro deletado com sucesso." };
        });
    }
    showPassword(userId, passwordId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSecret = yield this.keyService.findKeyByUserId(userId);
            const user = yield this.passwordRepository.findPasswordById(passwordId);
            const decriptedPassword = yield this.cryptoService.loadCryptography(user.password, userSecret.key, Buffer.from(userSecret.vetor, "base64"));
            return { status: 200, data: { decriptedPassword } };
        });
    }
}
exports.PasswordService = PasswordService;
//# sourceMappingURL=password.service.js.map