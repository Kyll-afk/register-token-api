import { Request, Response } from "express"
import { badRequest, serverError } from "../services/utils";
import { User, userModel } from "../models/users";
const insertUser = (req: Request, res: Response) => {
	{
		const user = req.body;
		if (!user)
			return badRequest(res, "User invalid")
		if (!user.email)
			return badRequest(res, "Email invalid")
		if (!user.password)
			return badRequest(res, "Invalid assword")
	}
	const user = req.body as User;
	userModel.insertUser(user).then(id => {
		res.json({
			id
		})
	}).catch(err => {
		serverError(res, err)
	})
}

export const userController = {
	insertUser
}