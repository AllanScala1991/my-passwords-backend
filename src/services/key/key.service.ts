import { CreateKeyModel, KeyModel, KeyReponseModel } from "../../models/keys/keys";
import { UUIDModel } from "../../models/uuid/uuid";

export class KeyService {
    constructor(
        private keyRepository: KeyModel,
        private uuidService: UUIDModel
    ){}

    generateSecretKey(): string {
        return this.uuidService.generatev4();
    }

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

    async deleteKeyByUserId(userId: string): Promise<void> {
        try {
            await this.keyRepository.deleteKeyByUserId(userId)
        } catch (error) {
            new Error(error.message)
        }
    }
}