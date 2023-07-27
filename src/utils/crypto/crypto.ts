import crypto from "node:crypto";
import { CreateCryptographyResponse, CryptographyModel } from "../../models/cryptography/cryptography";

export class Crypto implements CryptographyModel{

    createVetor(): Buffer {
        return crypto.randomBytes(16);
    }

    private adjustKeyLenght(key: string, size: number): string {
        if (key.length < size) {
        return key + '\0'.repeat(size - key.length);
        } else if (key.length > size) {
    
            return key.slice(0, size);
        }
        return key;
    }

    createCryptography(password: string, secretKey: string, vetor: Buffer): CreateCryptographyResponse {
        const adjustedKey = this.adjustKeyLenght(secretKey, 32);
        let cipher = crypto.createCipheriv("aes-256-cbc", adjustedKey, vetor);
        let passwordEncrypted = cipher.update(password, "utf8", "hex");
        passwordEncrypted += cipher.final("hex");

        return { passwordEncrypted, vetor}
    }

    loadCryptography(passwordEncrypted: string, secretKey: string, vetor: Buffer): string {
        const password = passwordEncrypted.slice(0, 32);
        const adjustedKey = this.adjustKeyLenght(secretKey, 32);
        const decipher = crypto.createDecipheriv("aes-256-cbc", adjustedKey, vetor);
        let decryptedPassword = decipher.update(password, "hex", "utf8");
        decryptedPassword += decipher.final("utf8");
        return decryptedPassword
    }
    
}