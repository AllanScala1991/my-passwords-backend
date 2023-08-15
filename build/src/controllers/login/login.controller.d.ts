import { Request, Response } from "express";
export declare class LoginController {
    private userRepository;
    private encrypter;
    private authentication;
    private loginService;
    constructor();
    handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
