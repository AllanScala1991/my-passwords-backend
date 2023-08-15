"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("./uuid");
describe("UUID Test", () => {
    const uuid = new uuid_1.UUID();
    test("Generate UUID V4", () => {
        const generate = uuid.generatev4();
        expect(generate).not.toBeNull;
        expect(typeof generate).toEqual("string");
    });
});
//# sourceMappingURL=uuid.test.js.map