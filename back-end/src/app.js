import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import cors from 'cors'

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

// Importa o client do Prisma para fazer conexão ao BD
import prisma from "./database/client.js"

const app = express();

app.use(cors())
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

//////////////////////////////////////////////////////////

import bookRouter from './routes/book.js'
app.use('/book', bookRouter)

import userRouter from './routes/user.js'
app.use('/user', userRouter)

import publisherRouter from './routes/publisher.js'
app.use('/publisher', publisherRouter)

export default app;
