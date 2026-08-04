import { prisma } from "../lib/prisma";

interface CrearRecordatorioInput {
  titulo: string;
  fecha: string;
}

export async function crearRecordatorio(datos: CrearRecordatorioInput) {
  if (!datos.titulo || datos.titulo.trim() === "") {
    throw new Error("El título es obligatorio");
  }
  if (!datos.fecha) {
    throw new Error("La fecha es obligatoria");
  }

  return prisma.recordatorio.create({
    data: {
      titulo: datos.titulo.trim(),
      fecha: new Date(datos.fecha),
    },
  });
}

export async function listarRecordatorios() {
  return prisma.recordatorio.findMany({
    orderBy: { fecha: "asc" },
  });
}

interface EditarRecordatorioInput {
  titulo?: string;
  fecha?: string;
}

export async function editarRecordatorio(id: string, datos: EditarRecordatorioInput) {
  if (datos.titulo !== undefined && datos.titulo.trim() === "") {
    throw new Error("El título no puede estar vacío");
  }

  return prisma.recordatorio.update({
    where: { id },
    data: {
      titulo: datos.titulo?.trim(),
      fecha: datos.fecha ? new Date(datos.fecha) : undefined,
    },
  });
}

export async function eliminarRecordatorio(id: string) {
  return prisma.recordatorio.delete({ where: { id } });
}