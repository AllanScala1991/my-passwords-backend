import { KeyModel } from "../../models/keys/keys";
import prisma from "../../utils/prisma/prisma"
import { KeyRepository } from "./key.repository";

describe("Key Repository Tests", () => {
    const keyRepository: KeyModel = new KeyRepository();

    test("Create key successfully", async () => {
        jest.spyOn(prisma.keys, "create").mockImplementationOnce(():any => {});

        await keyRepository.create({userId: "123", key: "321"});

        expect(prisma.keys.create).toBeCalled;
    });

    test("Find key by user id", async () => {
        jest.spyOn(prisma.keys, "findUnique").mockImplementationOnce(():any => {
            return {
                id: "789",
                userId: "123",
                key: "321",
                updatedAt: new Date(),
                createdAt: new Date()
            }
        });

        const key = await keyRepository.findKeyByUserId("123");

        expect(key.userId).toEqual("123");
        expect(key.key).toEqual("321");
    });

    test("Update by key id", async () => {
        jest.spyOn(prisma.keys, "update").mockImplementationOnce(():any => {});

        await keyRepository.updateKeyById("123", "321");

        expect(prisma.keys.update).toBeCalled;
    });
})