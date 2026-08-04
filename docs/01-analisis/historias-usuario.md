# Historias de Usuario — Iteración 1

## Estado de implementación

- [x] HU-01: Crear tarea
- [x] HU-02: Editar tarea
- [x] HU-03: Eliminar tarea
- [x] HU-04: Marcar tarea como completada
- [x] HU-05: Listar y ordenar tareas
- [x] HU-06: Buscar/filtrar tareas
- [x] HU-07: Crear recordatorio
- [x] HU-08: Editar y eliminar recordatorio

## Módulo: Tareas

### HU-01: Crear tarea
Como usuario, quiero crear una tarea con título, fecha límite, prioridad y categoría, para poder organizar lo que debo hacer.

**Criterios de aceptación**
- El título es obligatorio, no puede estar vacío.
- La fecha límite es opcional.
- La prioridad tiene valores predefinidos: Alta, Media, Baja.
- La categoría es un texto libre definido por el usuario.
- Al crearse, la tarea queda en estado "Pendiente".

### HU-02: Editar tarea
Como usuario, quiero editar los datos de una tarea existente, para corregir o actualizar su información.

**Criterios de aceptación**
- Se puede modificar título, fecha límite, prioridad y categoría.
- No se puede dejar el título vacío al editar.

### HU-03: Eliminar tarea
Como usuario, quiero eliminar una tarea, para quitarla definitivamente si ya no la necesito.

**Criterios de aceptación**
- Se solicita confirmación antes de eliminar.
- Al confirmar, la tarea desaparece de la lista.

### HU-04: Marcar tarea como completada
Como usuario, quiero marcar una tarea como completada, para diferenciar lo que ya hice de lo pendiente.

**Criterios de aceptación**
- Una tarea completada cambia visualmente (tachada o movida a otra sección).
- Se puede revertir el estado (marcar como pendiente de nuevo).

### HU-05: Listar y ordenar tareas
Como usuario, quiero ver mis tareas ordenadas por fecha límite (más próxima primero), para saber qué es más urgente.

**Criterios de aceptación**
- Las tareas sin fecha límite aparecen al final.
- El orden se recalcula automáticamente al agregar/editar tareas.

### HU-06: Buscar/filtrar tareas
Como usuario, quiero buscar tareas por texto y filtrar por categoría, para encontrar rápidamente lo que busco.

**Criterios de aceptación**
- La búsqueda es por coincidencia en el título.
- Se puede filtrar por categoría.

## Módulo: Recordatorios

### HU-07: Crear recordatorio
Como usuario, quiero crear un recordatorio con título y fecha, para acordarme de algo puntual sin necesidad de "completarlo".

**Criterios de aceptación**
- Título obligatorio.
- Fecha obligatoria.
- No tiene estado de completado, solo existe o se elimina.

### HU-08: Editar y eliminar recordatorio
Como usuario, quiero editar o eliminar un recordatorio, para mantenerlo actualizado o quitarlo si ya no aplica.

**Criterios de aceptación**
- Se puede modificar título y fecha.
- Se solicita confirmación antes de eliminar.
