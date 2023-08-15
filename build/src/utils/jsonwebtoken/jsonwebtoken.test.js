"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("./jsonwebtoken");
describe("Json Web Token Test", () => {
    const jsonWebToken = new jsonwebtoken_1.JsonWebToken();
    test("Generate new token", () => {
        const token = jsonWebToken.generate({ id: "123", name: "test" });
        expect(token).not.toBeNull;
        expect(typeof token).toEqual("string");
    });
    test("Validate token", () => {
        const token = jsonWebToken.generate({ id: "123", name: "test" });
        const validate = jsonWebToken.validate({ token: token });
        expect(validate).not.toBeNull;
        expect(typeof validate).toEqual("string");
    });
});
//# sourceMappingURL=jsonwebtoken.test.js.map