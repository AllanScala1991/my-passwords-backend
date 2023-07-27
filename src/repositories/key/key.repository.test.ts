import { CryptographyModel } from "../../models/cryptography/cryptography";
import { KeyModel } from "../../models/keys/keys";
import { Crypto } from "../../utils/crypto/crypto";
import prisma from "../../utils/prisma/prisma"
import { KeyRepository } from "./key.repository";

describe("Key Repository Tests", () => {
    const keyRepository: KeyModel = new KeyRepository();
    const cryptoService: CryptographyModel = new Crypto();

    test("Create key successfully", async () => {
        jest.spyOn(prisma.keys, "create").mockImplementationOnce(():any => {});

        const vetor = cryptoService.createVetor();

        await keyRepository.create({userId: "123", key: "321", vetor: vetor.toString("utf-8")});

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