import { UUID } from "./uuid"

describe("UUID Test", () => {
    const uuid = new UUID();

    test("Generate UUID V4", () => {
        const generate = uuid.generatev4();

        expect(generate).not.toBeNull;
        expect(typeof generate).toEqual("string");
    })
})