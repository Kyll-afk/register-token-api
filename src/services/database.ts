import sqlite3 from "sqlite3";

const DATABASE_FILE = process.env.DATABASE_FILE;
if (!DATABASE_FILE)
	throw new Error("DATABASE NOT FOUND")

export const connect = () => {
	let db = new sqlite3.Database(DATABASE_FILE,
		sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
		(err) => {
			console.log(err)
		});
	return db;
}

export const dbQueryFirst = async (query: string, params?: any[]) => {
	const returned = await dbQuery(query, params);
	return returned[0];
}

export const dbQuery = (query: string, params?: any[]) => {
	let db = connect();
	return new Promise<any[]>((resolve, reject) => {
		db.all(query, params, (err, rows) => {
			if (err)
				reject(err);
			else
				resolve(rows)
		})
	})
		.finally(() => {
			db.close()
		})
}