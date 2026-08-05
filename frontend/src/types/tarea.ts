export type Prioridad = "ALTA" | "MEDIA" | "BAJA";
export type Estado = "PENDIENTE" | "COMPLETADA";

export interface Tarea {
  id: string;
  titulo: string;
  fechaLimite: string | null;
  prioridad: Prioridad;
  categoria: string | null;
  estado: Estado;
  fechaCreacion: string;
}

export interface CrearTareaInput {
  titulo: string;
  fechaLimite?: string;
  prioridad: Prioridad;
  categoria?: string;
}