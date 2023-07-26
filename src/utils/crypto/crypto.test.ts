import { Crypto } from "./crypto";

describe("Crypto Tests", () => {
    const crypto = new Crypto();
    const password = "test";
    let secretKey = "jest";

    test("Create crypthography", () => {
        const pass = crypto.createCryptography(password, secretKey);

        expect(pass.passwordEncrypted).not.toBeNull;
    })

    test("Load password encrypted", () => {
        const pass = crypto.createCryptography(password, secretKey);

        const loadPassword = crypto.loadCryptography(pass.passwordEncrypted, secretKey, pass.vetor);

        expect(loadPassword).toEqual("test");
    })
})