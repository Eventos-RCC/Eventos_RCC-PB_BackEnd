import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { conectDataBase } from "./src/database/db.js";
import userRoutes from "./src/routes/user_routes.js";

dotenv.config();
const app = express();

conectDataBase()
app.use(cors());
app.use(express.json());

app.use(userRoutes);

export default app;