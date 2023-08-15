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
exports.LoginService = void 0;
class LoginService {
    constructor(userRepository, encrypter, authentication) {
        this.userRepository = userRepository;
        this.encrypter = encrypter;
        this.authentication = authentication;
    }
    ;
    handle(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let isPayloadEmpty = false;
            for (let index in user) {
                if (!user[index]) {
                    isPayloadEmpty = true;
                    break;
                }
            }
            if (isPayloadEmpty === true)
                return { status: 400, message: "Os campos de Usuário e Senha são obrigatórios." };
            const isUserExists = yield this.userRepository.findUserByUsername(user.username);
            if (isUserExists == null)
                return { status: 400, message: "Usuário ou Senha incorretos." };
            const isValidPassword = yield this.encrypter.compare({ current: user.password, hash: isUserExists.password });
            if (!isValidPassword)
                return { status: 400, message: "Usuário ou Senha incorretos." };
            const token = yield this.authentication.generate({ id: isUserExists.id, name: isUserExists.name });
            return { status: 200, data: { token: token } };
        });
    }
}
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map