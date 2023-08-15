/// <reference types="node" />
export interface CreateCryptographyResponse {
    passwordEncrypted: string;
    vetor: Buffer;
}
export interface CryptographyModel {
    createCryptography(password: string, secretKey: string, vetor: Buffer): CreateCryptographyResponse;
    loadCryptography(passwordEncrypted: string, secretKey: string, vetor: Buffer): string;
    createVetor(): Buffer;
}
