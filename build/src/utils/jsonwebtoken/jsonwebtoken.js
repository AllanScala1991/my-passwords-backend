"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonWebToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class JsonWebToken {
    generate(data) {
        return (0, jsonwebtoken_1.sign)({
            id: data.id,
            name: data.name
        }, `${process.env.SECRET_KEY}`, {
            expiresIn: '1d'
        });
    }
    validate(data) {
        return (0, jsonwebtoken_1.verify)(data.token, `${process.env.SECRET_KEY}`).toString();
    }
}
exports.JsonWebToken = JsonWebToken;
//# sourceMappingURL=jsonwebtoken.js.map