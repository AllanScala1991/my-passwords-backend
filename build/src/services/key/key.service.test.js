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
const crypto_1 = require("../../utils/crypto/crypto");
const uuid_1 = require("../../utils/uuid/uuid");
const key_service_1 = require("./key.service");
describe("Key Service Test", () => {
    const keyRepository = new key_repository_1.KeyRepository();
    const uuidService = new uuid_1.UUID();
    const keyService = new key_service_1.KeyService(keyRepository, uuidService);
    const cryptoService = new crypto_1.Crypto();
    test("Generate UUID v4", () => {
        const uuid = keyService.generateSecretKey();
        expect(uuid).not.toBeNull;
        expect(typeof uuid).toEqual("string");
    });
    test("Create new key", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(keyRepository, "create").mockImplementationOnce(() => { });
        let vetor = yield cryptoService.createVetor();
        yield keyService.create({ userId: "123", key: "321", vetor: vetor.toString("utf-8") });
        expect(keyRepository.create).toBeCalled;
    }));
    test("Create new key with error", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(keyRepository, "create").mockRejectedValueOnce(() => {
            return new Error("Error");
        });
        let vetor = yield cryptoService.createVetor();
        yield keyService.create({ userId: "123", key: "321", vetor: vetor.toString("utf-8") });
        expect(keyService.create).toThrowError;
    }));
    test("Find key by user id", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(keyRepository, "findKeyByUserId").mockImplementationOnce(() => {
            return {
                id: "789",
                userId: "123",
                key: "321",
                createdAt: new Date(),
                updatedAt: new Date()
            };
        });
        const data = yield keyService.findKeyByUserId("123");
        expect(data.key).toEqual("321");
        expect(data.userId).toEqual("123");
    }));
    test("Find key by user id error", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(keyRepository, "findKeyByUserId").mockRejectedValueOnce(() => {
            return new Error("Error");
        });
        yield keyService.findKeyByUserId("123");
        expect(keyService.findKeyByUserId).toThrowError;
    }));
    test("Update key by id", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(keyRepository, "updateKeyById").mockImplementationOnce(() => { });
        yield keyService.updateKeyById("123", "321");
        expect(keyRepository.updateKeyById).toBeCalled;
    }));
    test("Update key by id error", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(keyRepository, "updateKeyById").mockRejectedValueOnce(() => {
            return new Error("Error");
        });
        yield keyService.updateKeyById("123", "321");
        expect(keyService.updateKeyById).toThrowError;
    }));
});
//# sourceMappingURL=key.service.test.js.map