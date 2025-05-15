import "dotenv/config";
import app from "./app.js";
import cors from "cors";

const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:8086",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    optionsSuccessStatus: 200
}


app.use(cors(corsOptions));

const port = process.env.PORT || 8001;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));