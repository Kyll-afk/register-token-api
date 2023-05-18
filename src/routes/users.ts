import { Router } from "express";
import { userController } from "../controllers/users";

const userRouter = Router();

userRouter.post('/', userController.insertUser);

export { userRouter };