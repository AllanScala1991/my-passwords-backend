export interface CreatePasswordModel {
    userId: string
    title: string
    username: string
    password: string
    updatedAt?: Date
}

export interface PasswordResponseModel extends CreatePasswordModel {
    id: string
    createdAt: Date
}

export interface PasswordModel {
    create(password: CreatePasswordModel): Promise<PasswordResponseModel>
    updatePassword(id: string, password: CreatePasswordModel): Promise<PasswordResponseModel>
    findPasswordByTitle(title: string): Promise<PasswordResponseModel[]>
    deletePasswordById(id: string): Promise<void>
}