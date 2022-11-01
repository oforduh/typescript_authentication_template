import express from "express";
import "express-async-errors";

import compress from "compression";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { allowCompression } from "../helpers/compress";
import dotenv from "dotenv";
import { dbConnection } from "../database/db";
import { errorHandler } from "../middlewares/errorHandler";
import authRouter from "../api/auth/auth.routes";
import { NotFoundError } from "../errors/notFound.error";

dotenv.config();
dbConnection();

const app = express();

// request logging. dev: console | production: file
app.use(morgan("dev"));

// parse body params and attache them to req.body
app.use(express.json());

// gzip compression
app.use(compress({ filter: allowCompression }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount api v1 routes
app.use("/v1", authRouter);

app.all("*", () => {
  throw new NotFoundError("Route Not Found");
});

// Handle Application errors
app.use(errorHandler);

export default app;
