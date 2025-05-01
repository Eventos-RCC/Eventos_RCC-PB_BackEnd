import express from "express";
import dotenv from "dotenv";
import { conectDataBase } from "./src/database/db.js";
import { connectRedis } from "./src/database/redis.js";
import userRoutes from "./src/routes/user_routes.js";
import eventsRoutes from "./src/routes/events_routes.js";


dotenv.config();
const app = express();

conectDataBase();
connectRedis();

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', eventsRoutes);

export default app;