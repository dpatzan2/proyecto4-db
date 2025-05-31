/*
  Warnings:

  - You are about to drop the column `edificio_id` on the `aulas` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `aulas` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_calificacion` on the `calificaciones` table. All the data in the column will be lost.
  - You are about to drop the column `nota` on the `calificaciones` table. All the data in the column will be lost.
  - You are about to drop the column `duracion_anios` on the `carreras` table. All the data in the column will be lost.
  - You are about to drop the column `total_creditos` on the `carreras` table. All the data in the column will be lost.
  - You are about to drop the column `anio` on the `cursos` table. All the data in the column will be lost.
  - You are about to drop the column `cupo_maximo` on the `cursos` table. All the data in the column will be lost.
  - You are about to drop the column `semestre` on the `cursos` table. All the data in the column will be lost.
  - You are about to drop the column `director` on the `departamentos` table. All the data in the column will be lost.
  - The `estado` column on the `inscripciones` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `bibliotecas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `edificios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `libros` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[codigo_empleado]` on the table `profesores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigo` to the `aulas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facultad_id` to the `aulas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `aulas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calificacion` to the `calificaciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodo_academico_id` to the `cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seccion` to the `cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo_empleado` to the `profesores` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstadoEstudiante" AS ENUM ('ACTIVO', 'INACTIVO', 'EGRESADO');

-- CreateEnum
CREATE TYPE "EstadoCurso" AS ENUM ('ACTIVO', 'INACTIVO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "EstadoInscripcion" AS ENUM ('REGISTRADA', 'COMPLETADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "TipoCalificacion" AS ENUM ('PARCIAL', 'FINAL', 'PROYECTO', 'OTRO');

-- DropForeignKey
ALTER TABLE "aulas" DROP CONSTRAINT "aulas_edificio_id_fkey";

-- DropForeignKey
ALTER TABLE "libros" DROP CONSTRAINT "libros_biblioteca_id_fkey";

-- AlterTable
ALTER TABLE "aulas" DROP COLUMN "edificio_id",
DROP COLUMN "numero",
ADD COLUMN     "codigo" VARCHAR(20) NOT NULL,
ADD COLUMN     "edificio" VARCHAR(50),
ADD COLUMN     "facultad_id" INTEGER NOT NULL,
ADD COLUMN     "nombre" VARCHAR(100) NOT NULL,
ADD COLUMN     "piso" INTEGER,
ADD COLUMN     "tiene_aire_acondicionado" BOOLEAN,
ADD COLUMN     "tiene_proyector" BOOLEAN;

-- AlterTable
ALTER TABLE "calificaciones" DROP COLUMN "fecha_calificacion",
DROP COLUMN "nota",
ADD COLUMN     "calificacion" DECIMAL(5,2) NOT NULL,
ADD COLUMN     "fecha_evaluacion" TIMESTAMP(3),
ADD COLUMN     "nombre_evaluacion" VARCHAR(100),
ADD COLUMN     "observaciones" TEXT,
ADD COLUMN     "porcentaje" DECIMAL(5,2),
ADD COLUMN     "tipo" "TipoCalificacion";

-- AlterTable
ALTER TABLE "carreras" DROP COLUMN "duracion_anios",
DROP COLUMN "total_creditos",
ADD COLUMN     "coordinador" VARCHAR(100),
ADD COLUMN     "creditos_requeridos" INTEGER,
ADD COLUMN     "duracion_semestres" INTEGER,
ADD COLUMN     "modalidad" VARCHAR(50),
ADD COLUMN     "titulo_otorgado" VARCHAR(150);

-- AlterTable
ALTER TABLE "cursos" DROP COLUMN "anio",
DROP COLUMN "cupo_maximo",
DROP COLUMN "semestre",
ADD COLUMN     "cupos_disponibles" INTEGER,
ADD COLUMN     "cupos_maximos" INTEGER,
ADD COLUMN     "estado" "EstadoCurso",
ADD COLUMN     "periodo_academico_id" INTEGER NOT NULL,
ADD COLUMN     "seccion" VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE "departamentos" DROP COLUMN "director",
ADD COLUMN     "jefe_departamento" VARCHAR(100),
ADD COLUMN     "presupuesto" DECIMAL(10,2);

-- AlterTable
ALTER TABLE "estudiantes" ADD COLUMN     "cedula" VARCHAR(20),
ADD COLUMN     "creditos_aprobados" INTEGER,
ADD COLUMN     "estado" "EstadoEstudiante",
ADD COLUMN     "promedio_acumulado" DECIMAL(5,2),
ADD COLUMN     "semestre_actual" INTEGER;

-- AlterTable
ALTER TABLE "facultades" ALTER COLUMN "presupuesto_anual" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "inscripciones" DROP COLUMN "estado",
ADD COLUMN     "estado" "EstadoInscripcion";

-- AlterTable
ALTER TABLE "materias" ADD COLUMN     "es_obligatoria" BOOLEAN,
ADD COLUMN     "horas_practicas" INTEGER,
ADD COLUMN     "horas_teoricas" INTEGER,
ADD COLUMN     "semestre_sugerido" INTEGER;

-- AlterTable
ALTER TABLE "profesores" ADD COLUMN     "cedula" VARCHAR(20),
ADD COLUMN     "codigo_empleado" VARCHAR(20) NOT NULL,
ADD COLUMN     "especialidad" VARCHAR(100),
ADD COLUMN     "estado" "EstadoCurso",
ADD COLUMN     "fecha_nacimiento" TIMESTAMP(3),
ADD COLUMN     "tipo_contrato" VARCHAR(50),
ADD COLUMN     "titulo_academico" VARCHAR(150);

-- DropTable
DROP TABLE "bibliotecas";

-- DropTable
DROP TABLE "edificios";

-- DropTable
DROP TABLE "libros";

-- DropTable
DROP TABLE "usuarios";

-- CreateTable
CREATE TABLE "periodos_academicos" (
    "id" SERIAL NOT NULL,
    "universidad_id" INTEGER NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "codigo" VARCHAR(15) NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "fecha_inscripcion_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_inscripcion_fin" TIMESTAMP(3) NOT NULL,
    "es_activo" BOOLEAN NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "periodos_academicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horarios" (
    "id" SERIAL NOT NULL,
    "curso_id" INTEGER NOT NULL,
    "aula_id" INTEGER NOT NULL,
    "dia_semana" VARCHAR(15) NOT NULL,
    "hora_inicio" TIMESTAMP(3) NOT NULL,
    "hora_fin" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "horarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profesores_codigo_empleado_key" ON "profesores"("codigo_empleado");

-- AddForeignKey
ALTER TABLE "periodos_academicos" ADD CONSTRAINT "periodos_academicos_universidad_id_fkey" FOREIGN KEY ("universidad_id") REFERENCES "universidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cursos" ADD CONSTRAINT "cursos_periodo_academico_id_fkey" FOREIGN KEY ("periodo_academico_id") REFERENCES "periodos_academicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aulas" ADD CONSTRAINT "aulas_facultad_id_fkey" FOREIGN KEY ("facultad_id") REFERENCES "facultades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios" ADD CONSTRAINT "horarios_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "cursos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios" ADD CONSTRAINT "horarios_aula_id_fkey" FOREIGN KEY ("aula_id") REFERENCES "aulas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
