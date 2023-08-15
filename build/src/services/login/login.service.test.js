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
const user_repository_1 = require("../../repositories/user/user.repository");
const bcrypt_1 = require("../../utils/bcrypt/bcrypt");
const jsonwebtoken_1 = require("../../utils/jsonwebtoken/jsonwebtoken");
const login_service_1 = require("./login.service");
describe("Login Service Tests", () => {
    const userRepository = new user_repository_1.UserRepository();
    const encrypter = new bcrypt_1.Bcrypt();
    const authentication = new jsonwebtoken_1.JsonWebToken();
    const loginService = new login_service_1.LoginService(userRepository, encrypter, authentication);
    test("Login Sucessfully", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(userRepository, "findUserByUsername").mockImplementationOnce(() => true);
        jest.spyOn(encrypter, "compare").mockImplementationOnce(() => true);
        const userLogin = yield loginService.handle({ username: "Test", password: "123" });
        expect(userLogin.status).toEqual(200);
        expect(userLogin.data).not.toBeNull;
    }));
    test("Send empty username value", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLogin = yield loginService.handle({ username: "", password: "123" });
        expect(userLogin.status).toEqual(400);
        expect(userLogin.message).toEqual("Os campos de Usuário e Senha são obrigatórios.");
    }));
    test("Send invalid username", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(userRepository, "findUserByUsername").mockImplementationOnce(() => null);
        const userLogin = yield loginService.handle({ username: "invalid", password: "123" });
        expect(userLogin.status).toEqual(400);
        expect(userLogin.message).toEqual("Usuário ou Senha incorretos.");
    }));
    test("Send invalid password", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(userRepository, "findUserByUsername").mockImplementationOnce(() => true);
        jest.spyOn(encrypter, "compare").mockImplementationOnce(() => false);
        const userLogin = yield loginService.handle({ username: "Test", password: "invalid" });
        expect(userLogin.status).toEqual(400);
        expect(userLogin.message).toEqual("Usuário ou Senha incorretos.");
    }));
});
//# sourceMappingURL=login.service.test.js.map