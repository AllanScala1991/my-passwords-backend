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
const express_1 = require("express");
const password_controller_1 = require("../../controllers/password/password.controller");
const authentication_1 = __importDefault(require("../../middlewares/authentication/authentication"));
const app = (0, express_1.Router)();
const passwordController = new password_controller_1.PasswordController();
app.post("/password", authentication_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield passwordController.createNewPassword(req, res); }));
app.put("/password", authentication_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield passwordController.updatePasswordById(req, res); }));
app.get("/password/:title", authentication_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield passwordController.findPasswordByTitle(req, res); }));
app.get("/password/user/:userId", authentication_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield passwordController.findPasswordsByUserId(req, res); }));
app.delete("/password/:id", authentication_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield passwordController.deletePasswordById(req, res); }));
app.post("/password/show", authentication_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield passwordController.showUserPasswordById(req, res); }));
module.exports = app;
//# sourceMappingURL=password.route.js.map