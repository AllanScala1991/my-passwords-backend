"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
let prisma;
if (!global.prisma) {
    global.prisma = new client_1.PrismaClient();
}
prisma = global.prisma;
exports.default = prisma;
//# sourceMappingURL=prisma.js.map