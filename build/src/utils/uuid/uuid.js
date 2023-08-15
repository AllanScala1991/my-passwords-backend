"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUID = void 0;
const uuid_1 = require("uuid");
class UUID {
    generatev4() {
        return (0, uuid_1.v4)();
    }
}
exports.UUID = UUID;
//# sourceMappingURL=uuid.js.map