# Iteración 1 — Tareas y Recordatorios (MVP)

## Objetivo

Implementar el módulo de Tareas y Recordatorios de forma simple: sin repetición, sin subtareas, sin archivos adjuntos (esas quedan para iteraciones futuras).

## Alcance

- Módulo Tareas: HU-01 a HU-06
- Módulo Recordatorios: HU-07, HU-08

## Avance

| Historia | Estado |
|---|---|
| HU-01: Crear tarea | ✅ Implementada y probada (cURL) |
| HU-02: Editar tarea | ✅ Implementada y probada |
| HU-03: Eliminar tarea | ✅ Implementada y probada |
| HU-04: Marcar como completada | ✅ Implementada y probada |
| HU-05: Listar y ordenar | ✅ Implementada y probada |
| HU-06: Buscar/filtrar | ✅ Implementada y probada |
| HU-07: Crear recordatorio | ✅ Implementada y probada |
| HU-08: Editar/eliminar recordatorio | ✅ Implementada y probada |

## Decisiones y aprendizajes durante la implementación

- Se centralizó el cliente de Prisma en `src/lib/prisma.ts` para evitar múltiples instancias/conexiones (surgió al anticipar la necesidad para el service de Recordatorios).
- Prisma 7 (versión instalada) requiere driver adapters (`@prisma/adapter-pg`) y mueve la configuración de conexión a `prisma.config.ts`. Documentado en detalle en `docs/02-diseno/arquitectura.md`.
- La confirmación antes de eliminar (requisito de HU-03) se resolvió como responsabilidad del **frontend**, no del backend — el backend solo ejecuta el borrado cuando se lo piden.
- Incidente de seguridad menor: se subió por error un `.env` a una rama remota antes de agregarlo al `.gitignore`. Se resolvió rotando la credencial de la base de datos local y reescribiendo el historial de la rama (`git reset --soft` + `push --force`, seguro por tratarse de una rama individual no compartida).

## Avance — Frontend

| Funcionalidad | Estado |
|---|---|
| Formulario de creación de tareas | ✅ Implementado y probado en navegador |
| Listado de tareas | ✅ Implementado y probado |
| Marcar/desmarcar como completada | ✅ Implementado y probado |
| Eliminar tarea (con confirmación) | ✅ Implementado y probado |
| Frontend de Recordatorios | ⏳ Pendiente |
| Estilos (CSS) | ⏳ Pendiente — funcional pero sin diseño visual |

### Aprendizajes técnicos adicionales (Frontend)
- Vite requiere `import type` para importaciones de solo-tipos (ver `docs/02-diseno/arquitectura.md`).
- Configuración de CORS necesaria al separar frontend y backend en distintos puertos durante desarrollo.
- Se adoptó axios en lugar de fetch nativo para centralizar configuración HTTP.