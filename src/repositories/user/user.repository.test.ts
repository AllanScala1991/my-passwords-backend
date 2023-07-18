import prisma from "../../utils/prisma/prisma";
import { UserRepository } from "./user.repository";

describe("User Repository Tests", () => {
    const userRepository: UserRepository = new UserRepository();

    test("Create new user", async () => {
        const payload = {
            name: "test",
            email: "test@mail.com",
            username: "test",
            password: "123"
        }

        jest.spyOn(prisma.user, "create").mockImplementationOnce((): any => {
            return {
                id: "123", 
                name: "test",
                email: "test@mail.com",
                username: "test", 
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        const user = await userRepository.create(payload);

        expect(user.id).not.toBeNull;
        expect(user.name).toEqual("test");
    })

    test("Find user by id", async () => {
        jest.spyOn(prisma.user, "findUnique").mockImplementationOnce((): any => {
            return {
                id: "123", 
                name: "test",
                email: "test@mail.com",
                username: "test", 
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        const user = await userRepository.findUserById("123");

        expect(user.id).toEqual("123");
        expect(user.name).toEqual("test");
    })

    test("Update user by id", async () => {
        const payload = {
            name: "update name",
            email: "test@mail.com",
            username: "test",
            password: "123"
        }

        jest.spyOn(prisma.user, "update").mockImplementationOnce((): any => {
            return {
                id: "123", 
                name: "update name",
                email: "test@mail.com",
                username: "test", 
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        const user = await userRepository.updateUserById("123", payload);

        expect(user.name).toEqual("update name");
    })

    test("Delete user by id", async () => {
        jest.spyOn(prisma.user, "delete").mockImplementationOnce((): any => {})

        await userRepository.deleteUserById("123");

        expect(prisma.user.delete).toBeCalled();
    })
})