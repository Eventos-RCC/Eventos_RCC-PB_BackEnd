import "dotenv/config";
import app from "./app.js";
import cors from "cors";

// Configuração de CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:8080"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true, // importante se usar cookies ou auth headers
  optionsSuccessStatus: 204,
};

// Middleware global de CORS
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`✅ Servidor iniciado em http://localhost:${PORT}`);
});
