import type { Tarea } from "../types/tarea";

interface Props {
  tarea: Tarea;
  onCompletarToggle: (id: string, completar: boolean) => void;
  onEliminar: (id: string) => void;
}

export function TareaItem({ tarea, onCompletarToggle, onEliminar }: Props) {
  const completada = tarea.estado === "COMPLETADA";

  function handleEliminar() {
    const confirmado = window.confirm(`¿Eliminar la tarea "${tarea.titulo}"?`);
    if (confirmado) {
      onEliminar(tarea.id);
    }
  }

  return (
    <li style={{ textDecoration: completada ? "line-through" : "none" }}>
      <input
        type="checkbox"
        checked={completada}
        onChange={(e) => onCompletarToggle(tarea.id, e.target.checked)}
      />
      <strong>{tarea.titulo}</strong>
      {tarea.categoria && <span> — {tarea.categoria}</span>}
      {tarea.fechaLimite && <span> (vence: {tarea.fechaLimite.slice(0, 10)})</span>}
      <span> [{tarea.prioridad}]</span>
      <button onClick={handleEliminar}>Eliminar</button>
    </li>
  );
}