import { UserRepository } from "../../repositories/user/user.repository"
import { Bcrypt } from "../../utils/bcrypt/bcrypt";
import { JsonWebToken } from "../../utils/jsonwebtoken/jsonwebtoken";
import { LoginService } from "./login.service";

describe("Login Service Tests", () => {
    const userRepository = new UserRepository();
    const encrypter = new Bcrypt();
    const authentication = new JsonWebToken();
    const loginService = new LoginService(userRepository, encrypter, authentication);
    
    test("Login Sucessfully", async () => {
        jest.spyOn(userRepository, "findUserByUsername").mockImplementationOnce((): any => true);
        jest.spyOn(encrypter, "compare").mockImplementationOnce((): any => true);
        
        const userLogin = await loginService.handle({username: "Test", password: "123"});

        expect(userLogin.status).toEqual(200);
        expect(userLogin.data).not.toBeNull;
    })
    
    test("Send empty username value", async () => {
        const userLogin = await loginService.handle({username: "", password: "123"});

        expect(userLogin.status).toEqual(400);
        expect(userLogin.message).toEqual("Os campos de username e senha são obrigatórios.");
    })
    
    test("Send invalid username", async () => {
        jest.spyOn(userRepository, "findUserByUsername").mockImplementationOnce((): any => null);

        const userLogin = await loginService.handle({username: "invalid", password: "123"});

        expect(userLogin.status).toEqual(400);
        expect(userLogin.message).toEqual("Usuário ou Senha incorretos.");
    })
    
    test("Send invalid password", async () => {
        jest.spyOn(userRepository, "findUserByUsername").mockImplementationOnce((): any => true);
        jest.spyOn(encrypter, "compare").mockImplementationOnce((): any => false);
        
        const userLogin = await loginService.handle({username: "Test", password: "invalid"});

        expect(userLogin.status).toEqual(400);
        expect(userLogin.message).toEqual("Usuário ou Senha incorretos.");
    })
})