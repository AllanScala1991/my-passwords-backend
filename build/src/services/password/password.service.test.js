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
const key_repository_1 = require("../../repositories/key/key.repository");
const password_repository_1 = require("../../repositories/password/password.repository");
const crypto_1 = require("../../utils/crypto/crypto");
const uuid_1 = require("../../utils/uuid/uuid");
const key_service_1 = require("../key/key.service");
const password_service_1 = require("./password.service");
describe("Password Service Tests", () => {
    const passwordRepository = new password_repository_1.PasswordRepository();
    const cryptoService = new crypto_1.Crypto();
    const keyRepository = new key_repository_1.KeyRepository();
    const uuidService = new uuid_1.UUID();
    const keyService = new key_service_1.KeyService(keyRepository, uuidService);
    const passwordService = new password_service_1.PasswordService(passwordRepository, cryptoService, keyService);
    test("Create new password sucessfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const password = {
            id: "123",
            userId: "456",
            title: "test",
            username: "test_username",
            password: "987",
            cratedAt: new Date(),
            updatedAt: new Date()
        };
        jest.spyOn(keyService, "findKeyByUserId").mockImplementationOnce(() => {
            return { key: "123", vetor: "123" };
        });
        jest.spyOn(cryptoService, "createCryptography").mockImplementationOnce(() => {
            return { passwordEncrypted: "123" };
        });
        jest.spyOn(passwordRepository, "create").mockImplementationOnce(() => password);
        const createPassword = yield passwordService.create(password);
        expect(createPassword.status).toEqual(201);
        expect(createPassword.data).not.toBeNull;
    }));
    test("Send empty userId value", () => __awaiter(void 0, void 0, void 0, function* () {
        const password = {
            id: "123",
            userId: "",
            title: "test",
            username: "test_username",
            password: "987",
            cratedAt: new Date(),
            updatedAt: new Date()
        };
        const createPassword = yield passwordService.create(password);
        expect(createPassword.status).toEqual(400);
        expect(createPassword.message).toEqual("Todos os campos devem ser preenchidos.");
    }));
    test("Update user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const password = {
            id: "123",
            userId: "456",
            title: "test",
            username: "test_username",
            password: "987",
            cratedAt: new Date(),
            updatedAt: new Date()
        };
        jest.spyOn(passwordRepository, "findPasswordById").mockImplementationOnce(() => {
            return password;
        });
        jest.spyOn(keyService, "findKeyByUserId").mockImplementationOnce(() => {
            return { key: "123", vetor: "123" };
        });
        jest.spyOn(cryptoService, "createCryptography").mockImplementationOnce(() => {
            return { passwordEncrypted: "123" };
        });
        jest.spyOn(passwordRepository, "updatePassword").mockImplementationOnce(() => {
            return true;
        });
        const updatedPassword = yield passwordService.updateById("123", password);
        expect(updatedPassword.status).toEqual(200);
        expect(updatedPassword.message).toEqual("Registro atualizado com sucesso.");
    }));
    test("Send empty title in update by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const password = {
            id: "123",
            userId: "456",
            title: "",
            username: "test_username",
            password: "987",
            cratedAt: new Date(),
            updatedAt: new Date()
        };
        const updatedPassword = yield passwordService.updateById("123", password);
        expect(updatedPassword.status).toEqual(400);
        expect(updatedPassword.message).toEqual("Todos os campos devem ser preenchidos.");
    }));
    test("Send invalid password id", () => __awaiter(void 0, void 0, void 0, function* () {
        const password = {
            id: "123",
            userId: "456",
            title: "test",
            username: "test_username",
            password: "987",
            cratedAt: new Date(),
            updatedAt: new Date()
        };
        jest.spyOn(passwordRepository, "findPasswordById").mockImplementationOnce(() => {
            return null;
        });
        const updatedPassword = yield passwordService.updateById("invalid", password);
        expect(updatedPassword.status).toEqual(404);
        expect(updatedPassword.message).toEqual("Registro de senha não localizado.");
    }));
    test("Find password by title", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(passwordRepository, "findPasswordByTitle").mockImplementationOnce(() => {
            return [{ title: "test", password: "123" }, { title: "test", password: "123" }];
        });
        const passwords = yield passwordService.findByTitle("test");
        expect(passwords.status).toEqual(200);
        expect(passwords.data).not.toBeNull;
    }));
    test("Send empty title in find password by title", () => __awaiter(void 0, void 0, void 0, function* () {
        const passwords = yield passwordService.findByTitle("");
        expect(passwords.status).toEqual(400);
        expect(passwords.message).toEqual("Todos os campos devem ser preenchidos.");
    }));
    test("Can't find any record", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(passwordRepository, "findPasswordByTitle").mockImplementationOnce(() => {
            return [];
        });
        const passwords = yield passwordService.findByTitle("invalid");
        expect(passwords.status).toEqual(404);
        expect(passwords.message).toEqual("Nenhum registro localizado.");
    }));
    test("Find all passwords by user id", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(passwordRepository, "findAllPasswordsByUserId").mockImplementationOnce(() => {
            return [{ title: "test", password: "123" }, { title: "test", password: "123" }];
        });
        const allPasswords = yield passwordService.findAllPasswordByUserId("123");
        expect(allPasswords.status).toEqual(200);
        expect(allPasswords.data).not.toBeNull;
    }));
    test("Send empty user id in find all password by user id", () => __awaiter(void 0, void 0, void 0, function* () {
        const allPasswords = yield passwordService.findAllPasswordByUserId("");
        expect(allPasswords.status).toEqual(400);
        expect(allPasswords.message).toEqual("ID inválido.");
    }));
    test("Can't find any record in all password by user id", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(passwordRepository, "findAllPasswordsByUserId").mockImplementationOnce(() => {
            return [];
        });
        const allPasswords = yield passwordService.findAllPasswordByUserId("456");
        expect(allPasswords.status).toEqual(404);
        expect(allPasswords.message).toEqual("Nenhum registro localizado.");
    }));
    test("Delete user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(passwordRepository, "findPasswordById").mockImplementationOnce(() => {
            return true;
        });
        jest.spyOn(passwordRepository, "deletePasswordById").mockImplementationOnce(() => {
            return true;
        });
        const deletePassword = yield passwordService.deleteById("123");
        expect(deletePassword.status).toEqual(200);
        expect(deletePassword.message).toEqual("Registro deletado com sucesso.");
    }));
    test("Send empty id in delete user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const deletePassword = yield passwordService.deleteById("");
        expect(deletePassword.status).toEqual(400);
        expect(deletePassword.message).toEqual("ID inválido.");
    }));
    test("Can`t find password by id in delete user", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(passwordRepository, "findPasswordById").mockImplementationOnce(() => {
            return null;
        });
        const deletePassword = yield passwordService.deleteById("123");
        expect(deletePassword.status).toEqual(404);
        expect(deletePassword.message).toEqual("Registro de senha não localizado.");
    }));
    test("Show password", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(keyService, "findKeyByUserId").mockImplementationOnce(() => {
            return { key: "123", vetor: "123" };
        });
        jest.spyOn(passwordRepository, "findPasswordById").mockImplementationOnce(() => {
            return { password: "abc" };
        });
        jest.spyOn(cryptoService, "loadCryptography").mockImplementationOnce(() => {
            return { decriptedPassword: "123" };
        });
        const loadPassword = yield passwordService.showPassword("123", "321");
        expect(loadPassword.status).toEqual(200);
        expect(loadPassword.data).not.toBeNull;
    }));
});
//# sourceMappingURL=password.service.test.js.map