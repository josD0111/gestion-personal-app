# Arquitectura — Iteración 1

## Estilo arquitectónico

Aplicación web separada en tres capas:

```
Frontend (React + TypeScript)
        │  API REST (JSON sobre HTTP)
Backend (Node.js + Express + TypeScript)
        │
Base de Datos (PostgreSQL)
```

**Justificación de la separación en capas**: el frontend se encarga solo de la interfaz y la interacción con el usuario. El backend concentra la lógica de negocio y la expone mediante una API. La base de datos persiste los datos. Esta separación permite, a futuro, que otros clientes (por ejemplo una app nativa) consuman la misma API sin duplicar lógica de negocio.

## Stack tecnológico elegido

| Capa | Tecnología | Justificación |
|---|---|---|
| Frontend | React + TypeScript | Experiencia previa del equipo. TypeScript agrega tipado estático. |
| Backend | Node.js + Express + TypeScript | Mismo lenguaje que el frontend. Express es minimalista, ideal para entender los fundamentos de una API sin frameworks pesados. |
| Base de datos | PostgreSQL | Relacional, estándar de la industria, encaja con datos estructurados (Tarea, Recordatorio). |
| ORM | Prisma | Type-safety, migraciones automáticas versionadas, reduce código repetitivo de acceso a datos. |
| Comunicación | API REST (JSON/HTTP) | Estándar simple y ampliamente adoptado. GraphQL queda descartado por complejidad innecesaria para este alcance. |

**Decisiones descartadas y por qué**:
- Todo en un solo archivo/monolito sin separar frontend/backend: rompería el aprendizaje del patrón real de la industria y no serviría de base para evolución futura (PWA, apps nativas).
- Microservicios, Next.js full-stack, GraphQL: sobre-ingeniería para el alcance y tamaño de este proyecto (un solo desarrollador, MVP acotado).

## Arquitectura interna del Backend

```
src/
├── routes/          # Define los endpoints (URLs) de la API
├── controllers/     # Recibe la petición HTTP, llama a la lógica, devuelve respuesta
├── services/        # Lógica de negocio (ej: "el título no puede estar vacío")
├── models/          # Definición de las entidades (vía Prisma)
└── app.ts           # Punto de entrada de la aplicación
```

Flujo de una petición: `routes → controllers → services → Prisma → PostgreSQL`, y la respuesta viaja de vuelta por el mismo camino.

## Endpoints — Iteración 1

### Tareas

| Método | Ruta | Historia de usuario |
|---|---|---|
| POST | /api/tareas | HU-01: Crear tarea |
| GET | /api/tareas | HU-05/HU-06: Listar, ordenar, buscar y filtrar (query params: `?busqueda=&categoria=`) |
| PATCH | /api/tareas/:id | HU-02: Editar tarea |
| PATCH | /api/tareas/:id/completar | HU-04: Marcar como completada/pendiente |
| DELETE | /api/tareas/:id | HU-03: Eliminar tarea (con confirmación en el frontend) |

### Recordatorios

| Método | Ruta | Historia de usuario |
|---|---|---|
| POST | /api/recordatorios | HU-07: Crear recordatorio |
| GET | /api/recordatorios | Listar recordatorios |
| PATCH | /api/recordatorios/:id | HU-08: Editar recordatorio |
| DELETE | /api/recordatorios/:id | HU-08: Eliminar recordatorio (con confirmación en el frontend) |

**Nota de diseño**: `completar` es una ruta separada de la edición general, ya que marcar como completada es una acción de negocio específica, no una edición genérica de campos.

## Nota sobre la versión de Prisma (v7)

Este proyecto usa **Prisma 7**, que introdujo cambios importantes respecto a versiones anteriores:

- La configuración de conexión (`DATABASE_URL`) ya no vive en `schema.prisma`, sino en un archivo separado `prisma.config.ts` en la raíz del backend.
- Prisma 7 requiere un **driver adapter** explícito (`@prisma/adapter-pg` + `pg`) para conectarse a PostgreSQL, en vez de manejar la conexión internamente como en versiones anteriores.

El cliente de Prisma se centraliza en `src/lib/prisma.ts`, instanciado una única vez con el adapter configurado, y se importa desde ahí en todos los `services` (evita múltiples conexiones/pools innecesarios a la base de datos).

## Nota sobre TypeScript en Vite: `import type`

Vite transpila cada archivo TypeScript de forma aislada (con `esbuild`), sin analizar el proyecto completo como hace `tsc`. Esto significa que no puede distinguir automáticamente si un `import` trae un tipo (interface) o un valor real (función, clase). Si se importan solo tipos sin la palabra clave `type`, Vite genera un `import` de JavaScript que intenta buscar ese valor en tiempo de ejecución — y falla, porque los tipos no existen luego de compilar.

**Regla aplicada en el frontend**: toda importación de interfaces/tipos usa `import type`, por ejemplo:
```typescript
import type { Tarea, CrearTareaInput } from "../types/tarea";
```

Este problema no aparece en el backend porque ahí se compila con `tsc`, que sí distingue tipos de valores analizando el proyecto completo.

## CORS (Cross-Origin Resource Sharing)

El frontend (`http://localhost:5173`) y el backend (`http://localhost:3000`) son orígenes distintos para el navegador (mismo host, distinto puerto), por lo que las peticiones eran bloqueadas por política de seguridad del navegador.

**Solución**: se agregó el middleware `cors` en el backend, autorizando explícitamente el origen del frontend:

```typescript
app.use(cors({ origin: "http://localhost:5173" }));
```

Se usó el origen específico en vez de `origin: "*"` (que permite cualquier origen) como buena práctica de seguridad, incluso en desarrollo — evita acostumbrarse a una configuración que sería riesgosa en producción.

## Arquitectura interna del Frontend

```
frontend/src/
├── api/ # Comunicación con el backend (cliente axios centralizado + funciones por recurso)
├── types/ # Tipos TypeScript compartidos, reflejando el modelo de datos del backend
├── components/ # Componentes de UI, con responsabilidades acotadas
├── App.tsx # Componente raíz, orquesta el estado compartido entre componentes
└── main.tsx # Punto de entrada, monta React en el DOM
```

**Cliente HTTP**: se eligió `axios` sobre `fetch` nativo para centralizar configuración (URL base, headers) en una sola instancia (`api/cliente.ts`), y porque lanza excepciones automáticamente ante respuestas HTTP de error, evitando chequeos manuales repetidos.

**Patrón de comunicación entre componentes**: los componentes hijos no llaman a la API directamente en todos los casos ni deciden lógica de confirmación de negocio; reciben funciones callback desde su padre (ej. `onCompletarToggle`, `onEliminar`) y el padre común (`App.tsx`) coordina el estado compartido (ej. refrescar la lista tras crear una tarea).

