/*
  Warnings:

  - The `seats` column on the `Orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "seats",
ADD COLUMN     "seats" INTEGER[];
