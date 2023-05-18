import { Response } from "express"
export const badRequest = (res: Response, err: string) => {
	res.status(400).json({
		err
	})
}

export const serverError = (res: Response, err: Error) => {
	res.status(500).json({
		err: err.message
	})
}

export const validateNumber = (num: any): boolean => (parseInt(num) > 0)

export const notFound = (res: Response) => {
	res.sendStatus(400)
}