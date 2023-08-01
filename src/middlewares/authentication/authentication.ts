import { NextFunction, Request, Response, Router } from "express";
import { TokenModel } from "../../models/token/token.model";
import { JsonWebToken } from "../../utils/jsonwebtoken/jsonwebtoken";

const app: Router = Router();
const tokenService: TokenModel = new JsonWebToken();

app.use(function (req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;

    if(!auth) return res.status(403).send("Acesso não autorizado.");

    const token = auth.split(" ");
    
    try {
        tokenService.validate({token: token[1]})
        return next()
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

export default app;