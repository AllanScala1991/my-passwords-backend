
export interface CreateUserModel {
    name: string
    email: string
    username: string
    password: string
}

export interface UserModel{
    id: string
    name: string
    email: string
    username: string
    createdAt: Date
    updatedAt: Date
}

export interface UserRepository {
    create(user: CreateUserModel): Promise<UserModel>
    findUserById(id: string): Promise<UserModel>
    updateUserById(id: string, user: CreateUserModel): Promise<UserModel>
    deleteUserById(id: string): Promise<void>
}