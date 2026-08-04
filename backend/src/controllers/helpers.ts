import { Response } from "express";

export function manejarError(error: unknown, res: Response) {
  if (error instanceof Error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}