import { useState } from "react";
import { FormularioTarea } from "./components/FormularioTarea";
import { ListaTareas } from "./components/ListaTareas";

function App() {
  const [actualizar, setActualizar] = useState(0);

  function handleTareaCreada() {
    setActualizar((prev) => prev + 1);
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "1rem" }}>
      <h1>Gestión Personal — Tareas</h1>
      <FormularioTarea onTareaCreada={handleTareaCreada} />
      <hr />
      <ListaTareas actualizar={actualizar} />
    </div>
  );
}

export default App;