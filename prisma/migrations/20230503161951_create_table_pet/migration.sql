-- CreateEnum
CREATE TYPE "Age" AS ENUM ('cub', 'adolescent', 'elderly');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('small', 'medium', 'big');

-- CreateEnum
CREATE TYPE "Independece" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('cat', 'dog');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" "Age" NOT NULL,
    "size" "Size" NOT NULL,
    "lvl_independence" "Independece" NOT NULL,
    "type" "Type" NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);
