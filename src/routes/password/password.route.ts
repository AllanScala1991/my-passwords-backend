import { Request, Response, Router } from "express";
import { PasswordController } from "../../controllers/password/password.controller";
import auth from "../../middlewares/authentication/authentication";

const app: Router = Router();
const passwordController: PasswordController = new PasswordController();

app.post("/password", auth, async (req: Request, res: Response) => await passwordController.createNewPassword(req, res));
app.put("/password", auth, async (req: Request, res: Response) => await passwordController.updatePasswordById(req, res));
app.get("/password/:title", auth, async (req: Request, res: Response) => await passwordController.findPasswordByTitle(req, res));
app.get("/password/user/:userId", auth, async (req: Request, res: Response) => await passwordController.findPasswordsByUserId(req, res));
app.delete("/password/:id", auth, async (req: Request, res: Response) => await passwordController.deletePasswordById(req, res));
app.post("/password/show", auth, async (req: Request, res: Response) => await passwordController.showUserPasswordById(req, res));

module.exports = app;