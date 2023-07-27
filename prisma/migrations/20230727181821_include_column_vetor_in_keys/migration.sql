/*
  Warnings:

  - Added the required column `vetor` to the `Keys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Keys" ADD COLUMN     "vetor" TEXT NOT NULL;
