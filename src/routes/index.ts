import { Application } from "express";
import {Router} from 'express'
import { userRouter } from "./users";
export const useRoutes = (app: Application) => {
	const apiRouter = Router();
	apiRouter.use('/user', userRouter)
	app.use('/api/v1', apiRouter)
}