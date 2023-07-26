import { CreateKeyModel, KeyModel, KeyReponseModel } from "../../models/keys/keys";
import prisma from "../../utils/prisma/prisma";

export class KeyRepository implements KeyModel {

    async create(data: CreateKeyModel): Promise<void> {
        await prisma.keys.create({
            data: data
        });
    }

    async findKeyByUserId(userId: string): Promise<KeyReponseModel> {
        return await prisma.keys.findUnique({
            where: {
                userId: userId
            }
        })
    }

    async updateKeyById(keyId: string, key: string): Promise<void> {
        await prisma.keys.update({
            where: {
                id: keyId
            }, data: {
                key: key
            }
        })
    }
    
}