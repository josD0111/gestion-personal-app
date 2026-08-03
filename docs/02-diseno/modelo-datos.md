# Modelo de Datos — Iteración 1

## Entidad: Tarea

| Atributo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| id | identificador único | Sí | Generado por el sistema |
| titulo | texto | Sí | No puede estar vacío |
| fecha_limite | fecha | No | Opcional |
| prioridad | enumerado (Alta/Media/Baja) | Sí | Valor por defecto a definir en implementación |
| categoria | texto libre | No | Definida por el usuario, sin lista predefinida |
| estado | enumerado (Pendiente/Completada) | Sí | Default: Pendiente |
| fecha_creacion | fecha/hora | Sí | Para auditoría |

## Entidad: Recordatorio

| Atributo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| id | identificador único | Sí | |
| titulo | texto | Sí | |
| fecha | fecha | Sí | Obligatoria |
| fecha_creacion | fecha/hora | Sí | Auditoría |

## Relación entre entidades

Tarea y Recordatorio son entidades **independientes** en esta iteración, sin relación directa entre sí. Se evalúa deliberadamente no introducir relaciones o entidades compartidas (ej: "Categoría" como entidad propia) hasta que una necesidad real lo justifique en una iteración futura.

Principio aplicado: **YAGNI** (*You Aren't Gonna Need It*) — no se diseña para necesidades hipotéticas.

## Esquema de referencia (Prisma)

```prisma
model Tarea {
  id            String    @id @default(uuid())
  titulo        String
  fechaLimite   DateTime?
  prioridad     Prioridad
  categoria     String?
  estado        Estado    @default(PENDIENTE)
  fechaCreacion DateTime  @default(now())
}

model Recordatorio {
  id            String   @id @default(uuid())
  titulo        String
  fecha         DateTime
  fechaCreacion DateTime @default(now())
}

enum Prioridad {
  ALTA
  MEDIA
  BAJA
}

enum Estado {
  PENDIENTE
  COMPLETADA
}
```
