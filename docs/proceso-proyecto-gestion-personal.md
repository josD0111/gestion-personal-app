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

## 8. Diseño técnico — Iteración 1

### Modelo de datos
- **Tarea**: id, titulo, fechaLimite (opcional), prioridad (Alta/Media/Baja), categoria (texto libre), estado (Pendiente/Completada), fechaCreacion.
- **Recordatorio**: id, titulo, fecha (obligatoria), fechaCreacion.
- Entidades independientes, sin relación entre sí (decisión deliberada, principio YAGNI).

### Arquitectura
- Separación en 3 capas: Frontend (React + TS) / Backend (Node + Express + TS) / Base de datos (PostgreSQL).
- Backend organizado en capas internas: `routes → controllers → services → Prisma`.
- Comunicación vía API REST (JSON sobre HTTP).
- ORM: Prisma, con cliente centralizado en `src/lib/prisma.ts`.

### Particularidad técnica: Prisma 7
El proyecto usa Prisma 7, que cambió su forma de configurar la conexión a la base de datos:
- La `url` ya no va en `schema.prisma`, sino en `prisma.config.ts`.
- Requiere un driver adapter explícito (`@prisma/adapter-pg` + `pg`) en vez de manejar la conexión internamente.

## 9. Implementación — Iteración 1

Se implementaron las 8 historias de usuario (HU-01 a HU-08), cubriendo Tareas y Recordatorios completos: crear, editar, eliminar, listar/ordenar, buscar/filtrar, y marcar como completada (solo Tareas). Verificación funcional manual con cURL sobre todos los endpoints, incluyendo casos de validación inválidos.

### Buenas prácticas de código aplicadas
- Separación estricta de responsabilidades entre controller (HTTP) y service (lógica de negocio).
- DRY aplicado con criterio: se extrajo el manejo de errores compartido (`manejarError`) recién al repetirse por segunda vez, evitando abstracción prematura.
- Cliente de Prisma centralizado para evitar múltiples conexiones a la base de datos.

### Incidente y aprendizaje: exposición de credencial
Se subió por error un archivo `.env` a una rama remota antes de agregarlo al `.gitignore`. Resuelto: rotación de la credencial de base de datos + reescritura del historial de la rama afectada (`git rm --cached`, `git reset --soft`, `push --force` — seguro por tratarse de una rama individual no compartida). Lección: ante un secreto expuesto, rotar la credencial es más importante que solo limpiar el historial.

### Retrospectiva de la Iteración 1
**Funcionó bien**: troceo de alcance permitió cerrar un incremento completo; centralizar Prisma antes de escribir el segundo service evitó duplicar trabajo.
**A mejorar**: falta cobertura de tests automatizados (toda la verificación fue manual).

## 10. Estado actual

Backend de la Iteración 1 completo (Tareas y Recordatorios). Pendiente: Frontend, tests automatizados, e Iteración 2 (repetición de tareas/recordatorios).

## 11. Frontend — Iteración 1 (Tareas)

Stack: React + TypeScript + Vite, con axios como cliente HTTP.

Estructura: `api/` (comunicación con backend), `types/` (tipos compartidos), `components/` (UI).

Funcionalidad implementada y probada en navegador: crear, listar, marcar como completada, y eliminar tareas (con confirmación antes de eliminar, resuelta en el frontend según lo definido en el diseño).

### Problemas técnicos resueltos
- **`import type` en Vite**: necesario porque Vite transpila archivo por archivo (esbuild) y no distingue tipos de valores como sí lo hace `tsc` en el backend.
- **CORS**: el frontend y el backend corren en puertos distintos (orígenes distintos para el navegador), se resolvió habilitando el middleware `cors` en el backend, autorizando explícitamente el origen del frontend.

## 12. Estado actual (actualizado)

Backend completo. Frontend funcional para Tareas, sin estilos. Pendiente: frontend de Recordatorios, estilos, tests automatizados.