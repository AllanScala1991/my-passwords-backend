import { KeyModel } from "../../models/keys/keys"
import { KeyRepository } from "../../repositories/key/key.repository"
import { KeyService } from "./key.service";

describe("Key Service Test", () => {
    const keyRepository: KeyModel = new KeyRepository();
    const keyService: KeyService = new KeyService(keyRepository);

    test("Create new key", async () => {
        jest.spyOn(keyRepository, "create").mockImplementationOnce(():any => {});

        await keyService.create({userId: "123", key: "321"});

        expect(keyRepository.create).toBeCalled;
    });

    test("Create new key with error", async () => {
        jest.spyOn(keyRepository, "create").mockRejectedValueOnce(():any => {
            return new Error("Error")
        });

        await keyService.create({userId: "123", key: "321"});

        expect(keyService.create).toThrowError;
    });

    test("Find key by user id", async () => {
        jest.spyOn(keyRepository, "findKeyByUserId").mockImplementationOnce(():any => {
            return {
                id: "789",
                userId: "123",
                key: "321",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        const data = await keyService.findKeyByUserId("123");

        expect(data.key).toEqual("321");
        expect(data.userId).toEqual("123")
    });

    test("Find key by user id error", async () => {
        jest.spyOn(keyRepository, "findKeyByUserId").mockRejectedValueOnce(():any => {
            return new Error("Error")
        });

        await keyService.findKeyByUserId("123");

        expect(keyService.findKeyByUserId).toThrowError;
    });

    test("Update key by id", async () => {
        jest.spyOn(keyRepository, "updateKeyById").mockImplementationOnce(():any => {});

        await keyService.updateKeyById("123", "321");

        expect(keyRepository.updateKeyById).toBeCalled;
    });

    test("Update key by id error", async () => {
        jest.spyOn(keyRepository, "updateKeyById").mockRejectedValueOnce(():any => {
            return new Error("Error")
        });

        await keyService.updateKeyById("123", "321");

        expect(keyService.updateKeyById).toThrowError;
    });
})