import express from "express";
import dotenv from "dotenv";
import conectDataBase from "./src/database/db.js";

dotenv.config();
const app = express();

conectDataBase()
app.use(express.json());

export default app;