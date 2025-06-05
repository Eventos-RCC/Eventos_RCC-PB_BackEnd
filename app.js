import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { conectDataBase } from "./src/database/db.js";
import { connectRedis } from "./src/database/redis.js";
import mainRouter from './src/routes/main_routes.js';

dotenv.config();
const app = express();

conectDataBase();
connectRedis();

app.use(express.json());
app.use(cookieParser());
app.use('/api', mainRouter);

export default app;