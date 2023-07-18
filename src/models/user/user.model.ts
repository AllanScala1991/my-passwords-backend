
export interface CreateUserModel {
    name: string
    email: string
    username: string
    password: string
}

export interface UserModelResponse{
    id: string
    name: string
    email: string
    username: string
    createdAt: Date
    updatedAt: Date
}

export interface UserModel {
    create(user: CreateUserModel): Promise<UserModelResponse>
    findUserById(id: string): Promise<UserModelResponse>
    updateUserById(id: string, user: CreateUserModel): Promise<UserModelResponse>
    deleteUserById(id: string): Promise<void>
}