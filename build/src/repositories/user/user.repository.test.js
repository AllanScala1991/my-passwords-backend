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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../utils/prisma/prisma"));
const user_repository_1 = require("./user.repository");
describe("User Repository Tests", () => {
    const userRepository = new user_repository_1.UserRepository();
    test("Create new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            name: "test",
            email: "test@mail.com",
            username: "test",
            password: "123"
        };
        jest.spyOn(prisma_1.default.user, "create").mockImplementationOnce(() => {
            return {
                id: "123",
                name: "test",
                email: "test@mail.com",
                username: "test",
                createdAt: new Date(),
                updatedAt: new Date()
            };
        });
        const user = yield userRepository.create(payload);
        expect(user.id).not.toBeNull;
        expect(user.name).toEqual("test");
    }));
    test("Find user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(prisma_1.default.user, "findUnique").mockImplementationOnce(() => {
            return {
                id: "123",
                name: "test",
                email: "test@mail.com",
                username: "test",
                createdAt: new Date(),
                updatedAt: new Date()
            };
        });
        const user = yield userRepository.findUserById("123");
        expect(user.id).toEqual("123");
        expect(user.name).toEqual("test");
    }));
    test("Find user by username", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(prisma_1.default.user, "findUnique").mockImplementationOnce(() => {
            return {
                id: "123",
                name: "test",
                email: "test@mail.com",
                username: "test",
                createdAt: new Date(),
                updatedAt: new Date()
            };
        });
        const user = yield userRepository.findUserByUsername("test");
        expect(user.username).toEqual("test");
    }));
    test("Find user by email", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(prisma_1.default.user, "findUnique").mockImplementationOnce(() => {
            return {
                id: "123",
                name: "test",
                email: "test@mail.com",
                username: "test",
                createdAt: new Date(),
                updatedAt: new Date()
            };
        });
        const user = yield userRepository.findUserByEmail("test@mail.com");
        expect(user.email).toEqual("test@mail.com");
    }));
    test("Update user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            name: "update name",
            email: "test@mail.com",
            username: "test",
            password: "123"
        };
        jest.spyOn(prisma_1.default.user, "update").mockImplementationOnce(() => {
            return {
                id: "123",
                name: "update name",
                email: "test@mail.com",
                username: "test",
                createdAt: new Date(),
                updatedAt: new Date()
            };
        });
        const user = yield userRepository.updateUserById("123", payload);
        expect(user.name).toEqual("update name");
    }));
    test("Delete user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(prisma_1.default.user, "delete").mockImplementationOnce(() => { });
        yield userRepository.deleteUserById("123");
        expect(prisma_1.default.user.delete).toBeCalled();
    }));
});
//# sourceMappingURL=user.repository.test.js.map