import { EncrypterModel } from "../../models/encrypter/encrypter.model";
import { ResponseModel } from "../../models/response/response.model";
import { CreateUserModel } from "../../models/user/user.model";
import { UserRepository } from "../../repositories/user/user.repository";

export class UserService {
    private userRepositoy: UserRepository;

    constructor(private encrypter: EncrypterModel){
        this.userRepositoy = new UserRepository();
    }

    async createNewUser(user: CreateUserModel): Promise<ResponseModel> {
        try {
            let isUserEmpty = false;

            for(let index in user) {
                if(!user[index]) {
                    isUserEmpty = true;
                    break;
                }
            }

            const isUsernameExists = await this.userRepositoy.findUserByUsername(user.username);

            if(isUsernameExists) return {status: 400, message: "Já existe um usuário cadastrado com essas informações."};

            const isUserEmailExists = await this.userRepositoy.findUserByEmail(user.email);

            if(isUserEmailExists) return {status: 400, message: "Já existe um usuário cadastrado com essas informações."};

            const passwordHash = await this.encrypter.encrypt({value: user.password, salt: 8});

            user.password = passwordHash;

            const newUser = await this.userRepositoy.create(user);

            return {status: 201, data: newUser};
        } catch (error) {
            return { status: 500, message: error}
        }
    }

    async updateUser(id: string, user: CreateUserModel): Promise<ResponseModel> {
        try {
            if(!id) return { status: 400, message: "ID inválido ou inexistente." }

            let isUserEmpty = false;

            for(let index in user) {
                if(!user[index]) {
                    isUserEmpty = true;
                    break;
                }
            }

            const isUserExists = await this.userRepositoy.findUserById(id);

            if(!isUserExists) return { status: 400, message: "Usuário não localizado." }

            const updateUser = await this.userRepositoy.updateUserById(id, user);

            return { status: 200, data: updateUser };
        } catch (error) {
            return { status: 500, message: error }
        }
    }

    async deleteUser(id: string): Promise<ResponseModel> {
        try {
            if(!id) return { status: 400, message: "ID inválido ou inexistente." }
    
            const isUserExists = await this.userRepositoy.findUserById(id);
    
            if(!isUserExists) return { status: 400, message: "Usuário não localizado." }
    
            await this.userRepositoy.deleteUserById(id);
    
            return { status: 200, message: "Usuário deletado com sucesso."}
        } catch (error) {
            return { status: 500, message: error }
        }
    }
}