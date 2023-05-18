/** @SQLOperations
 * INSERT
 * UPDATE
 * DELETE
 * */

import { dbQuery } from "../services/database"

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
export const userModel = {
	insertUser,
	showUsers
}