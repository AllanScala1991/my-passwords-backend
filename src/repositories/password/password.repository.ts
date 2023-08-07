import { CreatePasswordModel, PasswordModel, PasswordResponseModel } from "../../models/password/password";
import prisma from "../../utils/prisma/prisma";

export class PasswordRepository implements PasswordModel {
    async create(password: CreatePasswordModel): Promise<PasswordResponseModel> {
        return await prisma.password.create({
            data: password
        });
    }

    async updatePassword(id: string, password: CreatePasswordModel): Promise<PasswordResponseModel> {
        return await prisma.password.update({
            where: {
                id: id
            }, data: password
        });
    }

    async findPasswordByTitle(title: string): Promise<PasswordResponseModel[]> {
        return await prisma.password.findMany({
            where: {
                title: {
                    startsWith: title
                }
            }
        });
    }

    async findPasswordById(id: string): Promise<PasswordResponseModel> {
        return await prisma.password.findUnique({
            where: {
                id: id
            }
        })
    }

    async findAllPasswordsByUserId(userId: string): Promise<PasswordResponseModel[]> {
        return await prisma.password.findMany({
            where: {
                userId: userId
            }
        })
    }

    async deletePasswordById(id: string): Promise<void> {
        await prisma.password.delete({
            where: {
                id: id
            }
        })
    }
    
}