import { Prioridad } from "@prisma/client";
import { prisma } from "../lib/prisma";

interface CrearTareaInput {
  titulo: string;
  fechaLimite?: string;
  prioridad: Prioridad;
  categoria?: string;
}

export async function crearTarea(datos: CrearTareaInput) {
  if (!datos.titulo || datos.titulo.trim() === "") {
    throw new Error("El título es obligatorio");
  }

  return prisma.tarea.create({
    data: {
      titulo: datos.titulo.trim(),
      fechaLimite: datos.fechaLimite ? new Date(datos.fechaLimite) : null,
      prioridad: datos.prioridad,
      categoria: datos.categoria,
    },
  });
}

interface ListarTareasFiltros {
  busqueda?: string;
  categoria?: string;
}

export async function listarTareas(filtros: ListarTareasFiltros) {
  return prisma.tarea.findMany({
    where: {
      titulo: filtros.busqueda
        ? { contains: filtros.busqueda, mode: "insensitive" }
        : undefined,
      categoria: filtros.categoria || undefined,
    },
    orderBy: [
      { fechaLimite: { sort: "asc", nulls: "last" } },
    ],
  });
}

interface EditarTareaInput {
  titulo?: string;
  fechaLimite?: string;
  prioridad?: Prioridad;
  categoria?: string;
}

export async function editarTarea(id: string, datos: EditarTareaInput) {
  if (datos.titulo !== undefined && datos.titulo.trim() === "") {
    throw new Error("El título no puede estar vacío");
  }

  return prisma.tarea.update({
    where: { id },
    data: {
      titulo: datos.titulo?.trim(),
      fechaLimite: datos.fechaLimite ? new Date(datos.fechaLimite) : undefined,
      prioridad: datos.prioridad,
      categoria: datos.categoria,
    },
  });
}

export async function cambiarEstadoTarea(id: string, completar: boolean) {
  return prisma.tarea.update({
    where: { id },
    data: { estado: completar ? "COMPLETADA" : "PENDIENTE" },
  });
}

export async function eliminarTarea(id: string) {
  return prisma.tarea.delete({ where: { id } });
}