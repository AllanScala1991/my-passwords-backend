import { CreateKeyModel, KeyModel, KeyReponseModel } from "../../models/keys/keys";
import { UUIDModel } from "../../models/uuid/uuid";
export declare class KeyService {
    private keyRepository;
    private uuidService;
    constructor(keyRepository: KeyModel, uuidService: UUIDModel);
    generateSecretKey(): string;
    create(data: CreateKeyModel): Promise<void>;
    findKeyByUserId(userId: string): Promise<KeyReponseModel>;
    updateKeyById(userId: string, keyId: string): Promise<void>;
}
