import { Request, Response } from "express";
export declare class UserController {
    private userRepository;
    private encrypter;
    private userService;
    private keyService;
    private keyRepository;
    private uuidService;
    private cryptoService;
    constructor();
    createNewUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUserById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUserById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
