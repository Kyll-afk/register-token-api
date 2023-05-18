import { Request, Response } from "express"
import { badRequest, notFound, serverError, validateNumber } from "../services/utils";
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

const showUser = ({}: Request, res: Response) => {
	userModel.showUsers().then(users => {
		res.json(users)
	}).catch(err => {
		serverError(res, err)
	})
}

const getUser = (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	{
		if (!validateNumber(id) || !id)
			return notFound(res)
	}
	return userModel.getUser(id).then((user) => {
		if (user)
			return res.json(user)
		else
			return notFound(res)
	}).catch(err => {
		serverError(res, err)
	})
}

const deleteUser = (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	{
		if (!validateNumber(id) || !id)
			return badRequest(res, 'invalid ID')
	}
	return userModel.deleteUser(id).then(() => {
		return res.sendStatus(200)
	}).catch(err => {
		serverError(res, err)
	})
}
export const userController = {
	insertUser,
	showUser,
	getUser,
	deleteUser
}