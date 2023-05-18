import dotenv from 'dotenv'
dotenv.config();
import bodyParser from "body-parser";

import express, { Response } from 'express'
import { useRoutes } from './routes';

const PORT = process.env.PORT || 8080;
const app = express();
// app.use(express.json());
app.use(bodyParser.json())
useRoutes(app)

/** @INITIAL-ROUTE
 * */

app.get('/', (res: Response) => res.json({
	msg: 'OK'
}))
app.listen(PORT, () => console.log(`Server started in http://localhost:${PORT}`))