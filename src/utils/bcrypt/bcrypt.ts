import { compare, hash } from "bcryptjs";
import { CompareModel, EncrypterModel, HashModel } from "../../models/encrypter/encrypter.model";

export class Bcrypt implements EncrypterModel {

    async encrypt(data: HashModel): Promise<string> {
        return await hash(data.value, data.salt);
    }

    async compare(data: CompareModel): Promise<boolean> {
        return await compare(data.current, data.hash);
    }
    
}