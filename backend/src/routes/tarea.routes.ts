import { Router } from "express";
import {
  crearTareaController,
  listarTareasController,
  editarTareaController,
  completarTareaController,
  eliminarTareaController,
} from "../controllers/tarea.controller";

const router = Router();

router.post("/", crearTareaController);
router.get("/", listarTareasController);
router.patch("/:id", editarTareaController);
router.patch("/:id/completar", completarTareaController);
router.delete("/:id", eliminarTareaController);

export default router;