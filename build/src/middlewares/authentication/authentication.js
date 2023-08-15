"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = require("../../utils/jsonwebtoken/jsonwebtoken");
const app = (0, express_1.Router)();
const tokenService = new jsonwebtoken_1.JsonWebToken();
app.use(function (req, res, next) {
    const auth = req.headers.authorization;
    if (!auth)
        return res.status(403).send("Acesso não autorizado.");
    const token = auth.split(" ");
    try {
        tokenService.validate({ token: token[1] });
        return next();
    }
    catch (error) {
        return res.status(403).json("Acesso não autorizado.");
    }
});
exports.default = app;
//# sourceMappingURL=authentication.js.map