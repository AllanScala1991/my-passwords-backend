import { GenerateTokenModel, TokenModel, ValidateTokenModel } from "../../models/token/token.model";
export declare class JsonWebToken implements TokenModel {
    generate(data: GenerateTokenModel): string;
    validate(data: ValidateTokenModel): string;
}
