import { CreateKeyModel, KeyModel, KeyReponseModel } from "../../models/keys/keys";
export declare class KeyRepository implements KeyModel {
    create(data: CreateKeyModel): Promise<void>;
    findKeyByUserId(userId: string): Promise<KeyReponseModel>;
    updateKeyById(keyId: string, key: string): Promise<void>;
}
