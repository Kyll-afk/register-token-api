import { Request, Response } from "express"
import { badRequest, notFound, serverError, validateNumber } from "../services/utils";
import { User, userModel } from "../models/users";

const insertUser = (req: Request, res: Response) => {
	{
		const user = req.body;
		if (!user)
			return badRequest(res, "Id invalid");

		if (!user.email)
			return badRequest(res, 'Invalid email');
	}
	const user = req.body as User;
	return userModel.insertUser(user)
		.then(() => {
			res.json(user);
		})
		.catch(err => serverError(res, err));
}

const updateUser = async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	{
		if (!validateNumber(id) || !id)
			return notFound(res)
		const user = req.body;

		if (!user)
			return badRequest(res, "Id invalid");

		if (!user.email)
			return badRequest(res, 'Invalid email');

		const userSaved = await userModel.getUser(id);
		if (!userSaved)
			return notFound(res)
		else if (!user.id)
			return notFound(res)
	}

	const user = req.body as User;
	return userModel.updateUser(user)
		.then(() => {
			res.json(user);
		})
		.catch(err => serverError(res, err));
}

const showUser = ({ }: Request, res: Response) => {
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

const deleteUser = async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	{
		if (!validateNumber(id) || !id)
			return badRequest(res, 'invalid ID')
		const existentUser = await userModel.getUser(id)
		if (!existentUser)
			return notFound(res)
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
	deleteUser,
	updateUser
}