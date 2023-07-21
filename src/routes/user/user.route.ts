import { Request, Response, Router } from "express";
import { UserController } from "../../controllers/user/user.controller";

const app: Router = Router();
const userController: UserController = new UserController();

app.post("/user", async (req: Request, res: Response) => await userController.createNewUser(req, res));
app.put("/user", async (req: Request, res: Response) => await userController.updateUserById(req, res));
app.delete("/user/:id", async (req: Request, res: Response) => await userController.deleteUserById(req, res));

module.exports = app;