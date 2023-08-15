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
const password_repository_1 = require("./password.repository");
describe("Password Repository Tests", () => {
    const passwordRepository = new password_repository_1.PasswordRepository();
    test("Create new password", () => __awaiter(void 0, void 0, void 0, function* () {
        const passwordMock = {
            id: "123",
            userId: "456",
            title: "test",
            username: "test",
            password: "123",
            createdAt: new Date(),
            updatedAt: new Date()
        };
        jest.spyOn(prisma_1.default.password, "create").mockImplementationOnce(() => passwordMock);
        const password = yield passwordRepository.create({
            userId: "456",
            title: "test",
            username: "test",
            password: "123",
        });
        expect(password.title).toEqual("test");
    }));
    test("Update password title", () => __awaiter(void 0, void 0, void 0, function* () {
        const passwordMock = {
            id: "123",
            userId: "456",
            title: "update test",
            username: "test",
            password: "123",
            createdAt: new Date(),
            updatedAt: new Date()
        };
        jest.spyOn(prisma_1.default.password, "update").mockImplementationOnce(() => passwordMock);
        const password = yield passwordRepository.updatePassword("123", {
            userId: "456",
            title: "update test",
            username: "test",
            password: "123",
        });
        expect(password.title).toEqual("update test");
    }));
    test("Find password by title", () => __awaiter(void 0, void 0, void 0, function* () {
        const passwordMock = {
            id: "123",
            userId: "456",
            title: "find by title",
            username: "test",
            password: "123",
            createdAt: new Date(),
            updatedAt: new Date()
        };
        jest.spyOn(prisma_1.default.password, "findMany").mockImplementationOnce(() => [passwordMock]);
        const passwords = yield passwordRepository.findPasswordByTitle("find by title");
        expect(passwords.length).toBeGreaterThan(0);
        expect(passwords[0].title).toEqual("find by title");
    }));
    test("Find password by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const passwordMock = {
            id: "123",
            userId: "456",
            title: "find by title",
            username: "test",
            password: "123",
            createdAt: new Date(),
            updatedAt: new Date()
        };
        jest.spyOn(prisma_1.default.password, "findUnique").mockImplementationOnce(() => passwordMock);
        const password = yield passwordRepository.findPasswordById("123");
        expect(password.id).toEqual("123");
    }));
    test("Find all passwords by user id", () => __awaiter(void 0, void 0, void 0, function* () {
        const passwordMock = {
            id: "123",
            userId: "456",
            title: "find by title",
            username: "test",
            password: "123",
            createdAt: new Date(),
            updatedAt: new Date()
        };
        jest.spyOn(prisma_1.default.password, "findMany").mockImplementationOnce(() => [passwordMock]);
        const password = yield passwordRepository.findAllPasswordsByUserId("456");
        expect(password[0].userId).toEqual("456");
    }));
    test("Delete password by id", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(prisma_1.default.password, "delete").mockImplementationOnce(() => { });
        yield passwordRepository.deletePasswordById("123");
        expect(passwordRepository.deletePasswordById).toBeCalled;
    }));
});
//# sourceMappingURL=password.repository.test.js.map