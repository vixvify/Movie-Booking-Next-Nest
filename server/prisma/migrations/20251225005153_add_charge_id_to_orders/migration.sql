/*
  Warnings:

  - Added the required column `amount` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chargeId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seats` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showtime` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "chargeId" TEXT NOT NULL,
ADD COLUMN     "movieId" TEXT NOT NULL,
ADD COLUMN     "seats" TEXT NOT NULL,
ADD COLUMN     "showtime" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
