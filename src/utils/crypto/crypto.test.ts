import { Crypto } from "./crypto";

describe("Crypto Tests", () => {
    const crypto = new Crypto();
    const password = "test";
    let secretKey = "jest";

    test("Create crypthography", () => {
        const vetor = crypto.createVetor();
        const pass = crypto.createCryptography(password, secretKey, vetor);

        expect(pass.passwordEncrypted).not.toBeNull;
    })

    test("Load password encrypted", () => {
        const vetor = crypto.createVetor();
        const pass = crypto.createCryptography(password, secretKey, vetor);

        const loadPassword = crypto.loadCryptography(pass.passwordEncrypted, secretKey, pass.vetor);

        expect(loadPassword).toEqual("test");
    })
})