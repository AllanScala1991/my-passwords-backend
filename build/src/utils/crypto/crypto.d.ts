/// <reference types="node" />
import { CreateCryptographyResponse, CryptographyModel } from "../../models/cryptography/cryptography";
export declare class Crypto implements CryptographyModel {
    createVetor(): Buffer;
    private adjustKeyLenght;
    createCryptography(password: string, secretKey: string, vetor: Buffer): CreateCryptographyResponse;
    loadCryptography(passwordEncrypted: string, secretKey: string, vetor: Buffer): string;
}
