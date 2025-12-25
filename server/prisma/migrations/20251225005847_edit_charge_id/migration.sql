/*
  Warnings:

  - A unique constraint covering the columns `[chargeId]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Orders_chargeId_key" ON "Orders"("chargeId");
