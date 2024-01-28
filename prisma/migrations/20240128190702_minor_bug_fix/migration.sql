/*
  Warnings:

  - Changed the type of `checkInDate` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `checkOutDate` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "checkInDate",
ADD COLUMN     "checkInDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "checkOutDate",
ADD COLUMN     "checkOutDate" TIMESTAMP(3) NOT NULL;
