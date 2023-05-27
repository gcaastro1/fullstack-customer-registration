/*
  Warnings:

  - You are about to drop the column `created_at` on the `contacts` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TEXT NOT NULL;
