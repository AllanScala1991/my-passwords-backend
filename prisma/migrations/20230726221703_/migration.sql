/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Keys` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Keys` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Keys" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Keys_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Keys_userId_key" ON "Keys"("userId");
