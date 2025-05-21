import express from "express";
import dotenv from "dotenv";

import { conectDataBase } from "./src/database/db.js";
import { connectRedis } from "./src/database/redis.js";
import mainRouter from './src/routes/main_routes.js';

import Queue from './src/jobs/lib/queue.js';

Queue.process();

dotenv.config();
const app = express();

conectDataBase();
connectRedis();

app.use(express.json());

app.use('/api', mainRouter);

export default app;