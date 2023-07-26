import { CreateKeyModel, KeyModel, KeyReponseModel } from "../../models/keys/keys";

export class KeyService {
    constructor(
        private keyRepository: KeyModel
    ){}

    async create(data: CreateKeyModel): Promise<void> {
        try {
            await this.keyRepository.create(data)
        } catch (error) {
            new Error(error.message)
        }
    }

    async findKeyByUserId(userId: string): Promise<KeyReponseModel> {
        try {
            return await this.keyRepository.findKeyByUserId(userId);
        } catch (error) {
            new Error(error.message);
        }
    }

    async updateKeyById(userId: string, keyId: string): Promise<void> {
        try {
            await this.keyRepository.updateKeyById(userId, keyId);
        } catch (error) {
            new Error(error.message);
        }
    }
}