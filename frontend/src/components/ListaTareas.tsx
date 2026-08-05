import { useEffect, useState } from "react";
import type { Tarea } from "../types/tarea";
import { obtenerTareas, cambiarEstadoTarea, eliminarTarea } from "../api/tareas";
import { TareaItem } from "./TareaItem";

export function ListaTareas({ actualizar }: { actualizar: number }) {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarTareas();
  }, [actualizar]);

  async function cargarTareas() {
    setCargando(true);
    try {
      const datos = await obtenerTareas();
      setTareas(datos);
      setError(null);
    } catch {
      setError("No se pudieron cargar las tareas");
    } finally {
      setCargando(false);
    }
  }

  async function handleCompletarToggle(id: string, completar: boolean) {
    await cambiarEstadoTarea(id, completar);
    cargarTareas();
  }

  async function handleEliminar(id: string) {
    await eliminarTarea(id);
    cargarTareas();
  }

  if (cargando) return <p>Cargando tareas...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (tareas.length === 0) return <p>No hay tareas todavía.</p>;

  return (
    <ul>
      {tareas.map((tarea) => (
        <TareaItem
          key={tarea.id}
          tarea={tarea}
          onCompletarToggle={handleCompletarToggle}
          onEliminar={handleEliminar}
        />
      ))}
    </ul>
  );
}