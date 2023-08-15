import { CompareModel, EncrypterModel, HashModel } from "../../models/encrypter/encrypter.model";
export declare class Bcrypt implements EncrypterModel {
    encrypt(data: HashModel): Promise<string>;
    compare(data: CompareModel): Promise<boolean>;
}
