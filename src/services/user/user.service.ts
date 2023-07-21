import { EncrypterModel } from "../../models/encrypter/encrypter.model";
import { ResponseModel } from "../../models/response/response.model";
import { CreateUserModel } from "../../models/user/user.model";
import { UserRepository } from "../../repositories/user/user.repository";

export class UserService {

    constructor(
        private encrypter: EncrypterModel,
        private userRepository: UserRepository
    ){}

    async createNewUser(user: CreateUserModel): Promise<ResponseModel> {
        let isUserEmpty = false;

        for(let index in user) {
            if(!user[index]) {
                isUserEmpty = true;
                break;
            }
        }

        if(isUserEmpty == true) return { status: 400, message: "Todos os campos devem ser preenchidos." }
        
        const isUsernameExists = await this.userRepository.findUserByUsername(user.username);
        
        if(isUsernameExists != null) return {status: 400, message: "Já existe um usuário cadastrado com essas informações."};

        const isUserEmailExists = await this.userRepository.findUserByEmail(user.email);

        if(isUserEmailExists != null) return {status: 400, message: "Já existe um usuário cadastrado com essas informações."};

        const passwordHash = await this.encrypter.encrypt({value: user.password, salt: 8});

        user.password = passwordHash;

        const newUser = await this.userRepository.create(user);

        return {status: 201, data: newUser};
    }

    async updateUser(id: string, user: CreateUserModel): Promise<ResponseModel> {
        if(!id) return { status: 400, message: "ID inválido ou inexistente." }

        let isUserEmpty = false;

        for(let index in user) {
            if(!user[index]) {
                isUserEmpty = true;
                break;
            }
        }

        if(isUserEmpty) return { status: 400, message: "Todos os campos devem ser preenchidos." }

        const isUserExists = await this.userRepository.findUserById(id);

        if(!isUserExists) return { status: 400, message: "Usuário não localizado." }

        const updateUser = await this.userRepository.updateUserById(id, user);

        return { status: 200, data: updateUser };
    }

    async deleteUser(id: string): Promise<ResponseModel> {
        if(!id) return { status: 400, message: "ID inválido ou inexistente." }
    
        const isUserExists = await this.userRepository.findUserById(id);
    
        if(!isUserExists) return { status: 400, message: "Usuário não localizado." }
    
        await this.userRepository.deleteUserById(id);
    
        return { status: 200, message: "Usuário deletado com sucesso."}
    }
}