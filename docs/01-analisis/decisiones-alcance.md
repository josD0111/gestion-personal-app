# Decisiones de Alcance

## Visión general del producto
La app de gestión personal contempla, a futuro, 6 módulos:
1. Tareas y recordatorios
2. Hábitos
3. Gestión financiera
4. Calendario
5. Estudio (pomodoro, apuntes)
6. Lista de compras/pagos

**Decisión**: no se construyen todos a la vez. Se prioriza **Tareas y Recordatorios** como módulo inicial. El resto queda en el backlog general del producto.

## Plataforma
**Decisión**: aplicación web (responsive), pensada para uso en notebook y celular vía navegador.

Evolución futura planteada:
1. Web responsive (actual)
2. PWA — instalable, notificaciones push, soporte offline parcial (reutiliza el código web)
3. Apps nativas / híbridas — solo si el producto madura y lo justifica

## Troceo del módulo Tareas y Recordatorios

| Iteración | Alcance |
|---|---|
| Iteración 1 (MVP) | Tareas y recordatorios simples: sin repetición, sin subtareas, sin adjuntos |
| Iteración 2 | Repetición de tareas/recordatorios |
| Iteración 3 | Subtareas y notas |
| Iteración 4 | Archivos adjuntos |

**Motivo**: el cliente solicitó funcionalidad avanzada desde el inicio (repetición, subtareas, adjuntos). Se decide trocear en incrementos pequeños para cumplir el principio ágil de entregas rápidas y validables, en vez de acumular todo en una sola entrega grande.

## Decisiones conceptuales clave

- **Tarea** y **Recordatorio** son entidades distintas, no una sola con un campo "tipo":
  - Tarea: tiene estado (pendiente/completada), es accionable.
  - Recordatorio: informativo, no se completa, solo existe o se elimina.
- Notificaciones: solo visuales en la Iteración 1 (push/email quedan en backlog).
- Categorías de tareas: texto libre, creado por el usuario.
- Orden por defecto: por fecha límite ascendente.
- Se pide confirmación antes de eliminar tareas o recordatorios.
- En Recordatorio, la fecha es obligatoria (a diferencia de la tarea, donde es opcional).
