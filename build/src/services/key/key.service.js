"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyService = void 0;
class KeyService {
    constructor(keyRepository, uuidService) {
        this.keyRepository = keyRepository;
        this.uuidService = uuidService;
    }
    generateSecretKey() {
        return this.uuidService.generatev4();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.keyRepository.create(data);
            }
            catch (error) {
                new Error(error.message);
            }
        });
    }
    findKeyByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.keyRepository.findKeyByUserId(userId);
            }
            catch (error) {
                new Error(error.message);
            }
        });
    }
    updateKeyById(userId, keyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.keyRepository.updateKeyById(userId, keyId);
            }
            catch (error) {
                new Error(error.message);
            }
        });
    }
}
exports.KeyService = KeyService;
//# sourceMappingURL=key.service.js.map