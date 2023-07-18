import { Bcrypt } from "./bcrypt";

describe("Bcrypt Tests", () => {
    const bcrypt: Bcrypt = new Bcrypt();

    test("Encrypt password", async () => {
        const passwordEncrypt = await bcrypt.encrypt({value: "123", salt: 8})

        expect(passwordEncrypt).not.toBeNull;
    })

    test("Compare password", async () => {
        const passwordEncrypted = await bcrypt.encrypt({value: "123", salt: 8})

        const comparePasswords = await bcrypt.compare({current: "123", hash: passwordEncrypted});

        expect(comparePasswords).toBeTruthy;
    })
})