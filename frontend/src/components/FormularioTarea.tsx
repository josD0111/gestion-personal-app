import { useState } from "react";
import { crearTarea } from "../api/tareas";
import type { Prioridad } from "../types/tarea";

interface Props {
  onTareaCreada: () => void;
}

export function FormularioTarea({ onTareaCreada }: Props) {
  const [titulo, setTitulo] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [prioridad, setPrioridad] = useState<Prioridad>("MEDIA");
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await crearTarea({
        titulo,
        fechaLimite: fechaLimite || undefined,
        prioridad,
        categoria: categoria || undefined,
      });
      setTitulo("");
      setFechaLimite("");
      setPrioridad("MEDIA");
      setCategoria("");
      onTareaCreada();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título de la tarea"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="date"
        value={fechaLimite}
        onChange={(e) => setFechaLimite(e.target.value)}
      />
      <select value={prioridad} onChange={(e) => setPrioridad(e.target.value as Prioridad)}>
        <option value="ALTA">Alta</option>
        <option value="MEDIA">Media</option>
        <option value="BAJA">Baja</option>
      </select>
      <input
        type="text"
        placeholder="Categoría"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />
      <button type="submit">Crear tarea</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}