import { Request, Response } from "express";
import {
  crearRecordatorio,
  listarRecordatorios,
  editarRecordatorio,
  eliminarRecordatorio,
} from "../services/recordatorio.service";
import { manejarError } from "./helpers";

export async function crearRecordatorioController(req: Request, res: Response) {
  try {
    const nuevo = await crearRecordatorio(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    manejarError(error, res);
  }
}

export async function listarRecordatoriosController(_req: Request, res: Response) {
  const recordatorios = await listarRecordatorios();
  res.json(recordatorios);
}

export async function editarRecordatorioController(req: Request, res: Response) {
  try {
    const recordatorio = await editarRecordatorio(req.params.id, req.body);
    res.json(recordatorio);
  } catch (error) {
    manejarError(error, res);
  }
}

export async function eliminarRecordatorioController(req: Request, res: Response) {
  try {
    await eliminarRecordatorio(req.params.id);
    res.status(204).send();
  } catch (error) {
    manejarError(error, res);
  }
}