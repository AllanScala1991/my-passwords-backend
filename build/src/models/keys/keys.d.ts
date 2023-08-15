export interface CreateKeyModel {
    userId: string;
    key: string;
    vetor: string;
    updatedAt?: Date;
}
export interface KeyReponseModel extends CreateKeyModel {
    id: string;
    createdAt: Date;
}
export interface KeyModel {
    create(data: CreateKeyModel): Promise<void>;
    findKeyByUserId(userId: string): Promise<KeyReponseModel>;
    updateKeyById(keyId: string, key: string): Promise<void>;
}
