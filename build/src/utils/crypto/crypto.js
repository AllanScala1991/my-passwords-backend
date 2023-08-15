"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
class Crypto {
    createVetor() {
        return node_crypto_1.default.randomBytes(16);
    }
    adjustKeyLenght(key, size) {
        if (key.length < size) {
            return key + '\0'.repeat(size - key.length);
        }
        else if (key.length > size) {
            return key.slice(0, size);
        }
        return key;
    }
    createCryptography(password, secretKey, vetor) {
        const adjustedKey = this.adjustKeyLenght(secretKey, 32);
        let cipher = node_crypto_1.default.createCipheriv("aes256", adjustedKey, vetor);
        let passwordEncrypted = cipher.update(password, "utf8", "hex");
        passwordEncrypted += cipher.final("hex");
        return { passwordEncrypted, vetor };
    }
    loadCryptography(passwordEncrypted, secretKey, vetor) {
        const password = passwordEncrypted.slice(0, 32);
        const adjustedKey = this.adjustKeyLenght(secretKey, 32);
        const decipher = node_crypto_1.default.createDecipheriv("aes256", adjustedKey, vetor);
        let decryptedPassword = decipher.update(password, "hex", "utf8");
        decryptedPassword += decipher.final("utf8");
        return decryptedPassword;
    }
}
exports.Crypto = Crypto;
//# sourceMappingURL=crypto.js.map