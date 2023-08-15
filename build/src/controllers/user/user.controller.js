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
exports.UserController = void 0;
const user_repository_1 = require("../../repositories/user/user.repository");
const user_service_1 = require("../../services/user/user.service");
const bcrypt_1 = require("../../utils/bcrypt/bcrypt");
const key_service_1 = require("../../services/key/key.service");
const key_repository_1 = require("../../repositories/key/key.repository");
const uuid_1 = require("../../utils/uuid/uuid");
const crypto_1 = require("../../utils/crypto/crypto");
class UserController {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
        this.encrypter = new bcrypt_1.Bcrypt();
        this.keyRepository = new key_repository_1.KeyRepository();
        this.uuidService = new uuid_1.UUID();
        this.keyService = new key_service_1.KeyService(this.keyRepository, this.uuidService);
        this.cryptoService = new crypto_1.Crypto();
        this.userService = new user_service_1.UserService(this.encrypter, this.userRepository, this.keyService, this.cryptoService);
    }
    createNewUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const response = yield this.userService.createNewUser(user);
                return res.status(response.status).json(response);
            }
            catch (error) {
                return res.status(500).json(error.message);
            }
        });
    }
    updateUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name, email, username, password } = req.body;
                const response = yield this.userService.updateUser(id, { name, email, username, password });
                return res.status(response.status).json(response);
            }
            catch (error) {
                return res.status(500).json(error.message);
            }
        });
    }
    deleteUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const response = yield this.userService.deleteUser(id);
                return res.status(response.status).json(response);
            }
            catch (error) {
                return res.status(500).json(error.message);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map