/*
  Warnings:

  - You are about to drop the column `customer_id` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `customers` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_customer_id_fkey";

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "customer_id",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
