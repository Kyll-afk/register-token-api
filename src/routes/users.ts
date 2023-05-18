import { Router } from "express";
import { userController } from "../controllers/users";


const userRouter = Router();
userRouter.get('/', userController.showUser);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', userController.insertUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export { userRouter };