/*
  Warnings:

  - Added the required column `expiresAt` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
