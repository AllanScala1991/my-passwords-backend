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
exports.UserService = void 0;
class UserService {
    constructor(encrypter, userRepository, keyService, cryptoService) {
        this.encrypter = encrypter;
        this.userRepository = userRepository;
        this.keyService = keyService;
        this.cryptoService = cryptoService;
    }
    createNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let isUserEmpty = false;
            for (let index in user) {
                if (!user[index]) {
                    isUserEmpty = true;
                    break;
                }
            }
            if (isUserEmpty == true)
                return { status: 400, message: "Todos os campos devem ser preenchidos." };
            const isUsernameExists = yield this.userRepository.findUserByUsername(user.username);
            if (isUsernameExists != null)
                return { status: 400, message: "Já existe um usuário cadastrado com essas informações." };
            const isUserEmailExists = yield this.userRepository.findUserByEmail(user.email);
            if (isUserEmailExists != null)
                return { status: 400, message: "Já existe um usuário cadastrado com essas informações." };
            const passwordHash = yield this.encrypter.encrypt({ value: user.password, salt: 8 });
            user.password = passwordHash;
            const newUser = yield this.userRepository.create(user);
            delete newUser.password;
            const key = this.keyService.generateSecretKey();
            const vetor = this.cryptoService.createVetor();
            yield this.keyService.create({
                userId: newUser.id,
                key: key,
                vetor: vetor.toString('base64')
            });
            return { status: 201, data: newUser };
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                return { status: 400, message: "ID inválido ou inexistente." };
            let isUserEmpty = false;
            for (let index in user) {
                if (!user[index]) {
                    isUserEmpty = true;
                    break;
                }
            }
            if (isUserEmpty)
                return { status: 400, message: "Todos os campos devem ser preenchidos." };
            const isUserExists = yield this.userRepository.findUserById(id);
            if (!isUserExists)
                return { status: 400, message: "Usuário não localizado." };
            const passwordHash = yield this.encrypter.encrypt({ value: user.password, salt: 8 });
            user.password = passwordHash;
            user.updatedAt = new Date();
            const updateUser = yield this.userRepository.updateUserById(id, user);
            delete updateUser.password;
            return { status: 200, data: updateUser };
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                return { status: 400, message: "ID inválido ou inexistente." };
            const isUserExists = yield this.userRepository.findUserById(id);
            if (!isUserExists)
                return { status: 400, message: "Usuário não localizado." };
            yield this.userRepository.deleteUserById(id);
            return { status: 200, message: "Usuário deletado com sucesso." };
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map