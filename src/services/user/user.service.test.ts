import { CryptographyModel } from "../../models/cryptography/cryptography";
import { EncrypterModel } from "../../models/encrypter/encrypter.model";
import { KeyModel } from "../../models/keys/keys";
import { UUIDModel } from "../../models/uuid/uuid";
import { KeyRepository } from "../../repositories/key/key.repository";
import { UserRepository } from "../../repositories/user/user.repository";
import { Bcrypt } from "../../utils/bcrypt/bcrypt";
import { Crypto } from "../../utils/crypto/crypto";
import { UUID } from "../../utils/uuid/uuid";
import { KeyService } from "../key/key.service";
import { UserService } from "./user.service";

describe("User Service Tests", () => {
    const encrypter: EncrypterModel = new Bcrypt();
    const userRepository: UserRepository = new UserRepository();
    const keyRepository: KeyModel = new KeyRepository();
    const uuidService: UUIDModel = new UUID();
    const keyService: KeyService = new KeyService(keyRepository, uuidService);
    const cryptoService: CryptographyModel = new Crypto();
    const userService: UserService = new UserService(encrypter, userRepository, keyService, cryptoService);
    const user = {
        name: "Test",
        email: "test@mail.com",
        username: "test",
        password: "123"
    }

    test("Create new user", async () => {
        jest.spyOn(userRepository, "findUserByUsername").mockImplementation((): any => {return null});
        jest.spyOn(userRepository, "findUserByEmail").mockImplementation((): any => {return null});
        jest.spyOn(userRepository, "create").mockImplementationOnce((): any => {
            return {status: 201, data: user};
        });
        jest.spyOn(keyService, "create").mockImplementationOnce((): any => {});

        const createUser = await userService.createNewUser(user);

        expect(createUser.status).toEqual(201);
    })

    test("Send duplicated username", async () => {
        jest.spyOn(userRepository, "findUserByUsername").mockImplementation((): any => {return user});

        const createUser = await userService.createNewUser(user);
        
        expect(createUser.status).toEqual(400);
        expect(createUser.message).toEqual("Já existe um usuário cadastrado com essas informações.");
    })

    test("Send duplicated email", async () => {
        jest.spyOn(userRepository, "findUserByUsername").mockImplementationOnce((): any => {
            return null;
        });

        jest.spyOn(userRepository, "findUserByEmail").mockImplementationOnce((): any => {
            return user;
        });

        const createUser = await userService.createNewUser(user);

        expect(createUser.status).toEqual(400);
        expect(createUser.message).toEqual("Já existe um usuário cadastrado com essas informações.");
    })

    test("Send empty payload value", async () => {
        let invalidPayload = {
            name: "",
            email: "test@mail.com",
            username: "test",
            password: "123"
        }

        const createUser = await userService.createNewUser(invalidPayload);

        expect(createUser.status).toEqual(400);
        expect(createUser.message).toEqual("Todos os campos devem ser preenchidos.");
    })
    
    test("Update user", async () => {
        const updatedUser = {
            name: "Update Name",
            email: "test@mail.com",
            username: "test",
            password: "123"
        }

        jest.spyOn(userRepository, "findUserById").mockImplementationOnce((): any => {return true});
        jest.spyOn(userRepository, "updateUserById").mockImplementationOnce((): any => {
            return {status: 200, data: updatedUser}
        });

        const userUpdated = await userService.updateUser("123", updatedUser);

        expect(userUpdated.status).toEqual(200);
    })
    
    test("Send empty id in updated user", async () => {
        const userUpdated = await userService.updateUser("", user);

        expect(userUpdated.status).toEqual(400);
        expect(userUpdated.message).toEqual("ID inválido ou inexistente.");
    })
    
    test("Send invalid id in updated user", async () => {
        jest.spyOn(userRepository, "findUserById").mockImplementationOnce((): any => {
            return false;
        })

        const userUpdated = await userService.updateUser("invalid", user);

        expect(userUpdated.status).toEqual(400);
        expect(userUpdated.message).toEqual("Usuário não localizado.");
    })
    
    test("Send empty payload value in update user", async () => {
        const invalidPayload = {
            name: "Update Name",
            email: "test@mail.com",
            username: "",
            password: "123"
        }

        const userUpdated = await userService.updateUser("123", invalidPayload);

        expect(userUpdated.status).toEqual(400);
        expect(userUpdated.message).toEqual("Todos os campos devem ser preenchidos.");
    })
    
    test("Delete user by id", async () => {
        jest.spyOn(userRepository, "findUserById").mockImplementationOnce((): any => {return true});
        jest.spyOn(userRepository, "deleteUserById").mockImplementationOnce((): any => {});

        const deleteUser = await userService.deleteUser("123");

        expect(deleteUser.status).toEqual(200);
        expect(deleteUser.message).toEqual("Usuário deletado com sucesso.")
    })
    
    test("Send invalid id to delete user", async () => {
        jest.spyOn(userRepository, "findUserById").mockImplementationOnce((): any => {return false});

        const deleteUser = await userService.deleteUser("invalid")

        expect(deleteUser.status).toEqual(400);
        expect(deleteUser.message).toEqual("Usuário não localizado.");
    })
    
    test("Send empty id to delete user", async () => {
        const deleteUser = await userService.deleteUser("");

        expect(deleteUser.status).toEqual(400);
        expect(deleteUser.message).toEqual("ID inválido ou inexistente.");
    })
})
