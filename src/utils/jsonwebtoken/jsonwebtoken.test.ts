import { TokenModel } from "../../models/token/token.model"
import { JsonWebToken } from "./jsonwebtoken"

describe("Json Web Token Test", () => {
    const jsonWebToken: TokenModel = new JsonWebToken();

    test("Generate new token", () => {
        const token = jsonWebToken.generate({ id: "123", name: "test" });

        expect(token).not.toBeNull;
        expect(typeof token).toEqual("string");
    })

    test("Validate token", () => {
        const token = jsonWebToken.generate({ id: "123", name: "test" });

        const validate = jsonWebToken.validate({ token: token });

        expect(validate).not.toBeNull;
        expect(typeof validate).toEqual("string");
    })
})