import prisma from "../../utils/prisma/prisma"
import { PasswordRepository } from "./password.repository"

describe("Password Repository Tests", () => {
    const passwordRepository: PasswordRepository = new PasswordRepository();
    
    test("Create new password", async () => {
        const passwordMock = {
            id: "123",
            userId: "456",
            title: "test",
            username: "test",
            password: "123",
            createdAt: new Date(),
            updatedAt: new Date()
        }

        jest.spyOn(prisma.password, "create").mockImplementationOnce((): any => passwordMock);

        const password = await passwordRepository.create({
            userId: "456",
            title: "test",
            username: "test",
            password: "123",
        });

        expect(password.title).toEqual("test");
    })
    
    test("Update password title", async () => {
        const passwordMock = {
            id: "123",
            userId: "456",
            title: "update test",
            username: "test",
            password: "123",
            createdAt: new Date(),
            updatedAt: new Date()
        }

        jest.spyOn(prisma.password, "update").mockImplementationOnce((): any => passwordMock);

        const password = await passwordRepository.updatePassword("123", {
            userId: "456",
            title: "update test",
            username: "test",
            password: "123",
        });

        expect(password.title).toEqual("update test");
    })
   
    test("Find password by title", async () => {
        const passwordMock = {
            id: "123",
            userId: "456",
            title: "find by title",
            username: "test",
            password: "123",
            createdAt: new Date(),
            updatedAt: new Date()
        }

        jest.spyOn(prisma.password, "findMany").mockImplementationOnce((): any => [passwordMock]);

        const passwords = await passwordRepository.findPasswordByTitle("find by title");

        expect(passwords.length).toBeGreaterThan(0);
        expect(passwords[0].title).toEqual("find by title");
    })
    
    test("Delete password by id", async () => {
        jest.spyOn(prisma.password, "delete").mockImplementationOnce((): any => {});

        await passwordRepository.deletePasswordById("123");

        expect(passwordRepository.deletePasswordById).toBeCalled;
    })
})