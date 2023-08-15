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
const user_repository_1 = require("../../repositories/user/user.repository");
const bcrypt_1 = require("../../utils/bcrypt/bcrypt");
const crypto_1 = require("../../utils/crypto/crypto");
const uuid_1 = require("../../utils/uuid/uuid");
const key_service_1 = require("../key/key.service");
const user_service_1 = require("./user.service");
describe("User Service Tests", () => {
    const encrypter = new bcrypt_1.Bcrypt();
    const userRepository = new user_repository_1.UserRepository();
    const keyRepository = new key_repository_1.KeyRepository();
    const uuidService = new uuid_1.UUID();
    const keyService = new key_service_1.KeyService(keyRepository, uuidService);
    const cryptoService = new crypto_1.Crypto();
    const userService = new user_service_1.UserService(encrypter, userRepository, keyService, cryptoService);
    const user = {
        name: "Test",
        email: "test@mail.com",
        username: "test",
        password: "123"
    };
    test("Create new user", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(userRepository, "findUserByUsername").mockImplementation(() => { return null; });
        jest.spyOn(userRepository, "findUserByEmail").mockImplementation(() => { return null; });
        jest.spyOn(userRepository, "create").mockImplementationOnce(() => {
            return { status: 201, data: user };
        });
        jest.spyOn(keyService, "create").mockImplementationOnce(() => { });
        const createUser = yield userService.createNewUser(user);
        expect(createUser.status).toEqual(201);
    }));
    test("Send duplicated username", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(userRepository, "findUserByUsername").mockImplementation(() => { return user; });
        const createUser = yield userService.createNewUser(user);
        expect(createUser.status).toEqual(400);
        expect(createUser.message).toEqual("Já existe um usuário cadastrado com essas informações.");
    }));
    test("Send duplicated email", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(userRepository, "findUserByUsername").mockImplementationOnce(() => {
            return null;
        });
        jest.spyOn(userRepository, "findUserByEmail").mockImplementationOnce(() => {
            return user;
        });
        const createUser = yield userService.createNewUser(user);
        expect(createUser.status).toEqual(400);
        expect(createUser.message).toEqual("Já existe um usuário cadastrado com essas informações.");
    }));
    test("Send empty payload value", () => __awaiter(void 0, void 0, void 0, function* () {
        let invalidPayload = {
            name: "",
            email: "test@mail.com",
            username: "test",
            password: "123"
        };
        const createUser = yield userService.createNewUser(invalidPayload);
        expect(createUser.status).toEqual(400);
        expect(createUser.message).toEqual("Todos os campos devem ser preenchidos.");
    }));
    test("Update user", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUser = {
            name: "Update Name",
            email: "test@mail.com",
            username: "test",
            password: "123"
        };
        jest.spyOn(userRepository, "findUserById").mockImplementationOnce(() => { return true; });
        jest.spyOn(userRepository, "updateUserById").mockImplementationOnce(() => {
            return { status: 200, data: updatedUser };
        });
        const userUpdated = yield userService.updateUser("123", updatedUser);
        expect(userUpdated.status).toEqual(200);
    }));
    test("Send empty id in updated user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userUpdated = yield userService.updateUser("", user);
        expect(userUpdated.status).toEqual(400);
        expect(userUpdated.message).toEqual("ID inválido ou inexistente.");
    }));
    test("Send invalid id in updated user", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(userRepository, "findUserById").mockImplementationOnce(() => {
            return false;
        });
        const userUpdated = yield userService.updateUser("invalid", user);
        expect(userUpdated.status).toEqual(400);
        expect(userUpdated.message).toEqual("Usuário não localizado.");
    }));
    test("Send empty payload value in update user", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidPayload = {
            name: "Update Name",
            email: "test@mail.com",
            username: "",
            password: "123"
        };
        const userUpdated = yield userService.updateUser("123", invalidPayload);
        expect(userUpdated.status).toEqual(400);
        expect(userUpdated.message).toEqual("Todos os campos devem ser preenchidos.");
    }));
    test("Delete user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(userRepository, "findUserById").mockImplementationOnce(() => { return true; });
        jest.spyOn(userRepository, "deleteUserById").mockImplementationOnce(() => { });
        const deleteUser = yield userService.deleteUser("123");
        expect(deleteUser.status).toEqual(200);
        expect(deleteUser.message).toEqual("Usuário deletado com sucesso.");
    }));
    test("Send invalid id to delete user", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(userRepository, "findUserById").mockImplementationOnce(() => { return false; });
        const deleteUser = yield userService.deleteUser("invalid");
        expect(deleteUser.status).toEqual(400);
        expect(deleteUser.message).toEqual("Usuário não localizado.");
    }));
    test("Send empty id to delete user", () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteUser = yield userService.deleteUser("");
        expect(deleteUser.status).toEqual(400);
        expect(deleteUser.message).toEqual("ID inválido ou inexistente.");
    }));
});
//# sourceMappingURL=user.service.test.js.map