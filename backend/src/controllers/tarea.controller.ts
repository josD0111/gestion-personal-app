import { Request, Response } from "express";

import { manejarError } from "./helpers";

import {
  crearTarea,
  listarTareas,
  editarTarea,
  cambiarEstadoTarea,
  eliminarTarea,
} from "../services/tarea.service";

export async function crearTareaController(req: Request, res: Response) {
  try {
    const nuevaTarea = await crearTarea(req.body);
    res.status(201).json(nuevaTarea);
  } catch (error) {
    manejarError(error, res);
  }
}

export async function listarTareasController(req: Request, res: Response) {
  const { busqueda, categoria } = req.query;
  const tareas = await listarTareas({
    busqueda: busqueda as string | undefined,
    categoria: categoria as string | undefined,
  });
  res.json(tareas);
}

export async function editarTareaController(req: Request, res: Response) {
  try {
    const tarea = await editarTarea(req.params.id, req.body);
    res.json(tarea);
  } catch (error) {
    manejarError(error, res);
  }
}

export async function completarTareaController(req: Request, res: Response) {
  try {
    const { completar } = req.body;
    const tarea = await cambiarEstadoTarea(req.params.id, completar);
    res.json(tarea);
  } catch (error) {
    manejarError(error, res);
  }
}

export async function eliminarTareaController(req: Request, res: Response) {
  try {
    await eliminarTarea(req.params.id);
    res.status(204).send();
  } catch (error) {
    manejarError(error, res);
  }
}