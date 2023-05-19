
/** @SQLOperations
 * INSERT
 * UPDATE
 * DELETE
 * */

import { dbQuery, dbQueryFirst } from "../services/database"
import bcrypt from 'bcrypt'
export type User = {
	id: number,
	email: string,
	password: string
}

const insertUser = async (user: User) => {
	const saltRounds = 5;
	bcrypt.hash(user.password, saltRounds, async (hash) => {
		await dbQuery(`CREATE TABLE IF NOT EXISTS user (
					"id"	INTEGER,
					"email"	TEXT,
					"password"	TEXT,
					PRIMARY KEY("id" AUTOINCREMENT)
				);`)
		await dbQuery('INSERT INTO user (email, password) VALUES(?, ?)', [user.email, hash])

	});
}

const updateUser = async (user: User) => {
	const saltRounds = 5;
	bcrypt.hash(user.password, saltRounds, async (hash) => {
		await dbQuery(`UPDATE user SET email = ?, password = ? WHERE id = ?`, [user.email, hash, user.id])
		return getUser(user.id)
	})
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
	deleteUser,
	updateUser
}