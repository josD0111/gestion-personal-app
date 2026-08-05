import type { Tarea, CrearTareaInput } from "../types/tarea";
import { api } from "./cliente";

export async function obtenerTareas(params?: { busqueda?: string; categoria?: string }): Promise<Tarea[]> {
  const { data } = await api.get<Tarea[]>("/tareas", { params });
  return data;
}

export async function crearTarea(datos: CrearTareaInput): Promise<Tarea> {
  const { data } = await api.post<Tarea>("/tareas", datos);
  return data;
}

export async function cambiarEstadoTarea(id: string, completar: boolean): Promise<Tarea> {
  const { data } = await api.patch<Tarea>(`/tareas/${id}/completar`, { completar });
  return data;
}

export async function eliminarTarea(id: string): Promise<void> {
  await api.delete(`/tareas/${id}`);
}