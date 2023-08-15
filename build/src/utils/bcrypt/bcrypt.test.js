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
const bcrypt_1 = require("./bcrypt");
describe("Bcrypt Tests", () => {
    const bcrypt = new bcrypt_1.Bcrypt();
    test("Encrypt password", () => __awaiter(void 0, void 0, void 0, function* () {
        const passwordEncrypt = yield bcrypt.encrypt({ value: "123", salt: 8 });
        expect(passwordEncrypt).not.toBeNull;
    }));
    test("Compare password", () => __awaiter(void 0, void 0, void 0, function* () {
        const passwordEncrypted = yield bcrypt.encrypt({ value: "123", salt: 8 });
        const comparePasswords = yield bcrypt.compare({ current: "123", hash: passwordEncrypted });
        expect(comparePasswords).toBeTruthy;
    }));
});
//# sourceMappingURL=bcrypt.test.js.map