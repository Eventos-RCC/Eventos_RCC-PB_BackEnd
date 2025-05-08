import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { conectDataBase } from "./src/database/db.js";
import { connectRedis } from "./src/database/redis.js";
import mainRouter from './src/routes/main_routes.js';


dotenv.config();
const app = express();

app.use(cors());
conectDataBase();
connectRedis();

app.use(express.json());

app.use('/api', mainRouter);

export default app;