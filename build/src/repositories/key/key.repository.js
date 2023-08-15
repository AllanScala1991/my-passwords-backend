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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyRepository = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma/prisma"));
class KeyRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.default.keys.create({
                data: data
            });
        });
    }
    findKeyByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.keys.findUnique({
                where: {
                    userId: userId
                }
            });
        });
    }
    updateKeyById(keyId, key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.default.keys.update({
                where: {
                    id: keyId
                }, data: {
                    key: key
                }
            });
        });
    }
}
exports.KeyRepository = KeyRepository;
//# sourceMappingURL=key.repository.js.map