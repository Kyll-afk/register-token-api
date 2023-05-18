import { Router } from "express";
import { userController } from "../controllers/users";

const userRouter = Router();

userRouter.post('/', userController.insertUser);
userRouter.get('/', userController.showUser);
userRouter.get('/:id', userController.getUser);
userRouter.delete('/:id', userController.deleteUser);

export { userRouter };