import { KeyRepository } from "../../repositories/key/key.repository";
import { PasswordRepository } from "../../repositories/password/password.repository"
import { Crypto } from "../../utils/crypto/crypto";
import { UUID } from "../../utils/uuid/uuid";
import { KeyService } from "../key/key.service";
import { PasswordService } from "./password.service";

describe("Password Service Tests", () => {
    const passwordRepository = new PasswordRepository();
    const cryptoService = new Crypto();
    const keyRepository = new KeyRepository();
    const uuidService = new UUID();
    const keyService = new KeyService(keyRepository, uuidService);
    const passwordService = new PasswordService(passwordRepository, cryptoService, keyService);
    
    test("Create new password sucessfully", async () => {
        const password = {
            id: "123",
            userId: "456",
            title: "test",
            username: "test_username",
            password: "987",
            cratedAt: new Date(),
            updatedAt: new Date()
        }

        jest.spyOn(keyService, "findKeyByUserId").mockImplementationOnce((): any => {
            return {key: "123", vetor: "123"}
        });
        jest.spyOn(cryptoService, "createCryptography").mockImplementationOnce((): any => {
            return {passwordEncrypted: "123"}
        });
        jest.spyOn(passwordRepository, "create").mockImplementationOnce((): any => password);

        const createPassword = await passwordService.create(password);

        expect(createPassword.status).toEqual(201);
        expect(createPassword.data).not.toBeNull;
    })

    test("Send empty userId value", async () => {
        const password = {
            id: "123",
            userId: "",
            title: "test",
            username: "test_username",
            password: "987",
            cratedAt: new Date(),
            updatedAt: new Date()
        }

        const createPassword = await passwordService.create(password);

        expect(createPassword.status).toEqual(400);
        expect(createPassword.message).toEqual("Todos os campos devem ser preenchidos.");
    })

    test("Update user by id", async () => {
        const password = {
            id: "123",
            userId: "456",
            title: "test",
            username: "test_username",
            password: "987",
            cratedAt: new Date(),
            updatedAt: new Date()
        }

        jest.spyOn(passwordRepository, "findPasswordById").mockImplementationOnce((): any => {
            return password;
        });
        jest.spyOn(keyService, "findKeyByUserId").mockImplementationOnce((): any => {
            return {key: "123", vetor: "123"}
        });
        jest.spyOn(cryptoService, "createCryptography").mockImplementationOnce((): any => {
            return {passwordEncrypted: "123"}
        });
        jest.spyOn(passwordRepository, "updatePassword").mockImplementationOnce((): any => {
            return true;
        });
        

        const updatedPassword = await passwordService.updateById("123", password);

        expect(updatedPassword.status).toEqual(200);
        expect(updatedPassword.message).toEqual("Registro atualizado com sucesso.");
    })

    test("Send empty title in update by id", async () => {
        const password = {
            id: "123",
            userId: "456",
            title: "",
            username: "test_username",
            password: "987",
            cratedAt: new Date(),
            updatedAt: new Date()
        }

        const updatedPassword = await passwordService.updateById("123", password);

        expect(updatedPassword.status).toEqual(400);
        expect(updatedPassword.message).toEqual("Todos os campos devem ser preenchidos.");
    })

    test("Send invalid password id", async () => {
        const password = {
            id: "123",
            userId: "456",
            title: "test",
            username: "test_username",
            password: "987",
            cratedAt: new Date(),
            updatedAt: new Date()
        }

        jest.spyOn(passwordRepository, "findPasswordById").mockImplementationOnce((): any => {
            return null;
        });

        const updatedPassword = await passwordService.updateById("invalid", password);

        expect(updatedPassword.status).toEqual(404);
        expect(updatedPassword.message).toEqual("Registro de senha não localizado.");
    })

    test("Find password by title", async () => {
        jest.spyOn(passwordRepository, "findPasswordByTitle").mockImplementationOnce((): any => {
            return [{title: "test", password: "123"}, {title: "test", password: "123"}]
        })

        const passwords = await passwordService.findByTitle("test");

        expect(passwords.status).toEqual(200);
        expect(passwords.data).not.toBeNull;
    })

    test("Send empty title in find password by title", async () => {
        const passwords = await passwordService.findByTitle("");

        expect(passwords.status).toEqual(400);
        expect(passwords.message).toEqual("Todos os campos devem ser preenchidos.");
    })

    test("Can't find any record", async () => {
        jest.spyOn(passwordRepository, "findPasswordByTitle").mockImplementationOnce((): any => {
            return []
        })

        const passwords = await passwordService.findByTitle("invalid");

        expect(passwords.status).toEqual(404);
        expect(passwords.message).toEqual("Nenhum registro localizado.");
    })

    test("Find all passwords by user id", async () => {
        jest.spyOn(passwordRepository, "findAllPasswordsByUserId").mockImplementationOnce((): any => {
            return [{title: "test", password: "123"}, {title: "test", password: "123"}]
        })

        const allPasswords = await passwordService.findAllPasswordByUserId("123");

        expect(allPasswords.status).toEqual(200);
        expect(allPasswords.data).not.toBeNull;
    })

    test("Send empty user id in find all password by user id", async () => {
        const allPasswords = await passwordService.findAllPasswordByUserId("");

        expect(allPasswords.status).toEqual(400);
        expect(allPasswords.message).toEqual("ID inválido.");
    })

    test("Can't find any record in all password by user id", async () => {
        jest.spyOn(passwordRepository, "findAllPasswordsByUserId").mockImplementationOnce((): any => {
            return []
        })

        const allPasswords = await passwordService.findAllPasswordByUserId("456");

        expect(allPasswords.status).toEqual(404);
        expect(allPasswords.message).toEqual("Nenhum registro localizado.");
    })

    test("Delete user by id", async () => {
        jest.spyOn(passwordRepository, "findPasswordById").mockImplementationOnce((): any => {
            return true;
        })
        jest.spyOn(passwordRepository, "deletePasswordById").mockImplementationOnce((): any => {
            return true;
        })

        const deletePassword = await passwordService.deleteById("123");

        expect(deletePassword.status).toEqual(200);
        expect(deletePassword.message).toEqual("Registro deletado com sucesso.");
    })

    test("Send empty id in delete user by id", async () => {
        const deletePassword = await passwordService.deleteById("");

        expect(deletePassword.status).toEqual(400);
        expect(deletePassword.message).toEqual("ID inválido.");
    })

    test("Can`t find password by id in delete user", async () => {
        jest.spyOn(passwordRepository, "findPasswordById").mockImplementationOnce((): any => {
            return null;
        })

        const deletePassword = await passwordService.deleteById("123");

        expect(deletePassword.status).toEqual(404);
        expect(deletePassword.message).toEqual("Registro de senha não localizado.");
    })

    test("Show password", async () => {
        jest.spyOn(keyService, "findKeyByUserId").mockImplementationOnce((): any => {
            return {key: "123", vetor: "123"};
        })
        jest.spyOn(passwordRepository, "findPasswordById").mockImplementationOnce((): any => {
            return {password: "abc"};
        })
        jest.spyOn(cryptoService, "loadCryptography").mockImplementationOnce((): any => {
            return {decriptedPassword: "123"};
        })

        const loadPassword = await passwordService.showPassword("123");

        expect(loadPassword.status).toEqual(200);
        expect(loadPassword.data).not.toBeNull;
    })
})