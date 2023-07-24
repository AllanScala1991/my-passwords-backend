import { Request, Response, Router } from "express";
import { LoginController } from "../../controllers/login/login.controller";

const app: Router = Router();
const loginController: LoginController = new LoginController();

app.post("/login", async (req: Request, res: Response) => await loginController.handle(req, res));

module.exports = app;