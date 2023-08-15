import { Request, Response } from "express";
export declare class PasswordController {
    private passwordRepository;
    private cryptoService;
    private keyRepository;
    private uuidService;
    private keyService;
    private passwordService;
    constructor();
    createNewPassword(req: Request, res: Response): Promise<void>;
    updatePasswordById(req: Request, res: Response): Promise<void>;
    findPasswordByTitle(req: Request, res: Response): Promise<void>;
    findPasswordsByUserId(req: Request, res: Response): Promise<void>;
    deletePasswordById(req: Request, res: Response): Promise<void>;
    showUserPasswordById(req: Request, res: Response): Promise<void>;
}
