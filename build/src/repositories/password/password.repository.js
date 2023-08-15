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
exports.PasswordRepository = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma/prisma"));
class PasswordRepository {
    create(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.password.create({
                data: password
            });
        });
    }
    updatePassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.password.update({
                where: {
                    id: id
                }, data: password
            });
        });
    }
    findPasswordByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.password.findMany({
                where: {
                    title: {
                        startsWith: title
                    }
                }
            });
        });
    }
    findPasswordById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.password.findUnique({
                where: {
                    id: id
                }
            });
        });
    }
    findAllPasswordsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.password.findMany({
                where: {
                    userId: userId
                }
            });
        });
    }
    deletePasswordById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.default.password.delete({
                where: {
                    id: id
                }
            });
        });
    }
}
exports.PasswordRepository = PasswordRepository;
//# sourceMappingURL=password.repository.js.map