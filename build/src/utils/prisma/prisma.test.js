"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("./prisma"));
describe('Prisma instance', () => {
    it('should be an instance of PrismaClient', () => {
        expect(prisma_1.default).toBeInstanceOf(client_1.PrismaClient);
    });
});
//# sourceMappingURL=prisma.test.js.map