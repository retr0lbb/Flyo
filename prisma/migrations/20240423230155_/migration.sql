/*
  Warnings:

  - A unique constraint covering the columns `[airPlaneId,passagerId]` on the table `plane_seat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "plane_seat_airPlaneId_passagerId_key" ON "plane_seat"("airPlaneId", "passagerId");
