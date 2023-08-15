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
const crypto_1 = require("../../utils/crypto/crypto");
const prisma_1 = __importDefault(require("../../utils/prisma/prisma"));
const key_repository_1 = require("./key.repository");
describe("Key Repository Tests", () => {
    const keyRepository = new key_repository_1.KeyRepository();
    const cryptoService = new crypto_1.Crypto();
    test("Create key successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(prisma_1.default.keys, "create").mockImplementationOnce(() => { });
        const vetor = cryptoService.createVetor();
        yield keyRepository.create({ userId: "123", key: "321", vetor: vetor.toString("utf-8") });
        expect(prisma_1.default.keys.create).toBeCalled;
    }));
    test("Find key by user id", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(prisma_1.default.keys, "findUnique").mockImplementationOnce(() => {
            return {
                id: "789",
                userId: "123",
                key: "321",
                updatedAt: new Date(),
                createdAt: new Date()
            };
        });
        const key = yield keyRepository.findKeyByUserId("123");
        expect(key.userId).toEqual("123");
        expect(key.key).toEqual("321");
    }));
    test("Update by key id", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(prisma_1.default.keys, "update").mockImplementationOnce(() => { });
        yield keyRepository.updateKeyById("123", "321");
        expect(prisma_1.default.keys.update).toBeCalled;
    }));
});
//# sourceMappingURL=key.repository.test.js.map