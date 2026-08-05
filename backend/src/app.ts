import "dotenv/config";
import express from "express";
import cors from "cors";
import tareaRoutes from "./routes/tarea.routes";
import recordatorioRoutes from "./routes/recordatorio.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/tareas", tareaRoutes);
app.use("/api/recordatorios", recordatorioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});