import express from "express";
import dotenv from "dotenv";
<<<<<<< HEAD
import cors from "cors";
import { conectDataBase } from "./src/database/db.js";
import userRoutes from "./src/routes/user_routes.js";
=======
import { conectDataBase } from "./src/database/db.js";
import { connectRedis } from "./src/database/redis.js";
import userRoutes from "./src/routes/user_routes.js";
import eventsRoutes from "./src/routes/events_routes.js";

>>>>>>> 26b31cb9b341675f3c4d3f656722b9d8d7b4cfe7

dotenv.config();
const app = express();

<<<<<<< HEAD
conectDataBase()
app.use(cors());
app.use(express.json());

app.use(userRoutes);
=======
conectDataBase();
connectRedis();

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', eventsRoutes);
>>>>>>> 26b31cb9b341675f3c4d3f656722b9d8d7b4cfe7

export default app;