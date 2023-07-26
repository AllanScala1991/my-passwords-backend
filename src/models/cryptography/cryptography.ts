export interface CreateCryptographyResponse {
    passwordEncrypted: string
    vetor: Buffer
}

export interface CryptographyModel {
    createCryptography(password: string, secretKey: string): CreateCryptographyResponse
    loadCryptography(passwordEncrypted: string, secretKey: string, vetor: Buffer): string
}