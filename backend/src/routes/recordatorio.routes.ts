import { Router } from "express";
import {
  crearRecordatorioController,
  listarRecordatoriosController,
  editarRecordatorioController,
  eliminarRecordatorioController,
} from "../controllers/recordatorio.controller";

const router = Router();

router.post("/", crearRecordatorioController);
router.get("/", listarRecordatoriosController);
router.patch("/:id", editarRecordatorioController);
router.delete("/:id", eliminarRecordatorioController);

export default router;