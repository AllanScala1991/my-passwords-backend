import { v4 as uuidv4 } from "uuid";
import { UUIDModel } from "../../models/uuid/uuid";

export class UUID implements UUIDModel{

    generatev4(): string {
        return uuidv4();
    }
}