# Proyecto: App de Gestión Personal — Registro del Proceso

## 1. Contexto del proyecto

- **Objetivo del proyecto (aprendizaje)**: aprender el proceso completo de construcción de software (metodologías, buenas prácticas, ciclo de vida) mediante la práctica.
- **Rol del estudiante**: doble rol — Cliente y Desarrollador.
- **Rol del asistente**: Programador Senior / Instructor, actuando también como analista de requisitos.
- **Producto**: aplicación de gestión personal.

## 2. Conceptos base definidos

| Concepto | Definición breve |
|---|---|
| Software | Código + documentación + configuración + todo artefacto necesario para funcionar y mantenerse |
| Ciclo de vida (SDLC) | Fases: análisis, diseño, implementación, pruebas, despliegue, mantenimiento |
| Proceso de desarrollo | El "cómo" concreto se organiza el trabajo para recorrer el ciclo de vida |
| Metodología | Marco general de principios (Waterfall, Scrum, Kanban, XP, etc.) |
| Buenas prácticas | Recomendaciones probadas por la industria (control de versiones, code reviews, tests, DRY, KISS, etc.) |
| Requisito funcional / no funcional | Qué debe hacer el sistema / cómo debe comportarse (rendimiento, seguridad, etc.) |
| Stakeholder | Persona con interés en el proyecto (cliente, usuario, desarrollador) |

## 3. Decisión de metodología

- **Metodología elegida**: Ágil simplificada (inspirada en Scrum/Kanban, sin la ceremonia completa de un equipo grande).
- **Justificación**: requisitos cambiantes (cliente aprendiendo sobre la marcha), equipo de una sola persona, se busca feedback y entregas incrementales.
- **Elementos que usaremos**: Product Backlog, historias de usuario, iteraciones cortas con objetivo concreto, revisión y retrospectiva por iteración.

## 4. Alcance general y priorización

Idea original del cliente (6 módulos):
1. Tareas y recordatorios
2. Hábitos
3. Gestión financiera
4. Calendario
5. Estudio (pomodoro, apuntes)
6. Lista de compras/pagos

**Decisión**: no se construye todo junto. Los módulos 2–6 quedan en el **backlog general del producto** para futuras iteraciones/fases.

**Plataforma**: Aplicación **web** (responsive). Evolución futura planteada:
1. Web responsive (ahora)
2. PWA (paso intermedio: instalable, notificaciones push, algo de offline)
3. Apps nativas / híbridas (fase madura del producto, si se justifica)

## 5. MVP — Iteración 1

**Módulo**: Tareas y Recordatorios

### Troceo de complejidad (para no sobrecargar la Iteración 1)

| Iteración | Alcance |
|---|---|
| Iteración 1 (MVP) | Tareas y recordatorios simples, sin repetición, sin subtareas, sin adjuntos |
| Iteración 2 | Repetición de tareas/recordatorios |
| Iteración 3 | Subtareas y notas |
| Iteración 4 | Archivos adjuntos |

### Decisiones de diseño conceptual tomadas

- Tarea y Recordatorio son **entidades distintas** (no un mismo registro con un campo "tipo").
  - **Tarea**: tiene estado (pendiente/completada), es accionable.
  - **Recordatorio**: es informativo, no se completa, solo existe o se elimina.
- Notificaciones: por ahora **solo visuales** (sin push, sin email) — queda en backlog.
- Categorías de tareas: **texto libre**, creadas por el usuario (sin lista predefinida cerrada).
- Orden por defecto de la lista de tareas: **por fecha límite, más próxima primero**.
- Se pide **confirmación antes de eliminar** una tarea o recordatorio.
- En Recordatorio, la **fecha es obligatoria** (a diferencia de la tarea, donde la fecha límite es opcional).

## 6. Historias de Usuario — Iteración 1

### Módulo Tareas
- **HU-01**: Crear tarea (título obligatorio, fecha límite opcional, prioridad Alta/Media/Baja, categoría libre)
- **HU-02**: Editar tarea
- **HU-03**: Eliminar tarea (con confirmación)
- **HU-04**: Marcar tarea como completada (reversible)
- **HU-05**: Listar y ordenar tareas (por fecha límite ascendente)
- **HU-06**: Buscar/filtrar tareas (por texto y por categoría)

### Módulo Recordatorios
- **HU-07**: Crear recordatorio (título y fecha obligatorios, sin estado de completado)
- **HU-08**: Editar y eliminar recordatorio (con confirmación al eliminar)

## 7. Próximo paso

Diseño técnico de la Iteración 1:
- Modelo de datos (entidades, atributos, relaciones)
- Arquitectura básica de la aplicación web
