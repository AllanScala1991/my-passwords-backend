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
exports.LoginController = void 0;
const user_repository_1 = require("../../repositories/user/user.repository");
const login_service_1 = require("../../services/login/login.service");
const bcrypt_1 = require("../../utils/bcrypt/bcrypt");
const jsonwebtoken_1 = require("../../utils/jsonwebtoken/jsonwebtoken");
class LoginController {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
        this.encrypter = new bcrypt_1.Bcrypt();
        this.authentication = new jsonwebtoken_1.JsonWebToken();
        this.loginService = new login_service_1.LoginService(this.userRepository, this.encrypter, this.authentication);
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userLogin = req.body;
                const response = yield this.loginService.handle(userLogin);
                return res.status(response.status).json(response);
            }
            catch (error) {
                return res.status(500).json(error.message);
            }
        });
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map