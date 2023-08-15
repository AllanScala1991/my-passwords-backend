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
exports.PasswordController = void 0;
const key_repository_1 = require("../../repositories/key/key.repository");
const key_service_1 = require("../../services/key/key.service");
const uuid_1 = require("../../utils/uuid/uuid");
const password_service_1 = require("../../services/password/password.service");
const password_repository_1 = require("../../repositories/password/password.repository");
const crypto_1 = require("../../utils/crypto/crypto");
class PasswordController {
    constructor() {
        this.passwordRepository = new password_repository_1.PasswordRepository();
        this.cryptoService = new crypto_1.Crypto();
        this.keyRepository = new key_repository_1.KeyRepository();
        this.uuidService = new uuid_1.UUID();
        this.keyService = new key_service_1.KeyService(this.keyRepository, this.uuidService);
        this.passwordService = new password_service_1.PasswordService(this.passwordRepository, this.cryptoService, this.keyService);
    }
    createNewPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const response = yield this.passwordService.create(data);
                res.status(response.status).json(response);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
    updatePasswordById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, userId, title, username, password, updatedAt } = req.body;
                const response = yield this.passwordService.updateById(id, { userId, title, username, password, updatedAt });
                res.status(response.status).json(response);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
    findPasswordByTitle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const title = req.params.title;
                const response = yield this.passwordService.findByTitle(title);
                res.status(response.status).json(response);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
    findPasswordsByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const response = yield this.passwordService.findAllPasswordByUserId(userId);
                res.status(response.status).json(response);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
    deletePasswordById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const response = yield this.passwordService.deleteById(id);
                res.status(response.status).json(response);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
    showUserPasswordById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, passwordId } = req.body;
                const response = yield this.passwordService.showPassword(userId, passwordId);
                res.status(response.status).json(response);
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
}
exports.PasswordController = PasswordController;
//# sourceMappingURL=password.controller.js.map