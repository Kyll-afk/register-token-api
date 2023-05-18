import sqlite3 from "sqlite3";

const DATABASE_FILE = process.env.DATABASE_FILE;
if (!DATABASE_FILE)
	throw new Error("DATABASE NOT FOUND")

export const connect = () => {
	let db = new sqlite3.Database(DATABASE_FILE)
	return db;
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