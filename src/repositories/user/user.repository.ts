import { CreateUserModel, UserModel, UserModelResponse } from "../../models/user/user.model";
import prisma from "../../utils/prisma/prisma";

export class UserRepository implements UserModel {

    async create(user: CreateUserModel): Promise<UserModelResponse> {
        return await prisma.user.create({
            data: user
        });
    }

    async findUserById(id: string): Promise<UserModelResponse> {
        return await prisma.user.findUnique({
            where: {
                id: id
            }
        });
    }

    async updateUserById(id: string, user: CreateUserModel): Promise<UserModelResponse> {
        return await prisma.user.update({
            where: {
                id: id
            }, data: user
        });
    }

    async deleteUserById(id: string): Promise<void> {
        await prisma.user.delete({where: {id: id}});
    }
    
}