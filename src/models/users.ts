/** @SQLOperations
 * INSERT
 * UPDATE
 * DELETE
 * */

import { dbQuery, dbQueryFirst } from "../services/database"

export type User = {
	id: number,
	email: string,
	password: string
}

const insertUser = async (user: User) => {
	await dbQuery('INSERT INTO user (email, password) VALUES(?, ?)', [user.email, user.password])
	let returned = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'user'`);
	return returned[0].Id as number || undefined;
}

const showUsers = async () => {
	const returned = await dbQuery(`SELECT * FROM user`)
	return returned as User[];
}

const getUser = async (id: number) => {
	const returned = await dbQueryFirst('SELECT * FROM user WHERE id = ?', [id])
	return returned as User || undefined;
}

const deleteUser = async (id: number) => {
	await dbQueryFirst('DELETE FROM user WHERE id = ?', [id])
}

export const userModel = {
	insertUser,
	showUsers,
	getUser,
	deleteUser
}