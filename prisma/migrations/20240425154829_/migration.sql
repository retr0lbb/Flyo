/*
  Warnings:

  - A unique constraint covering the columns `[airPlaneId,row_code,seat_code]` on the table `plane_seat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "check_in" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "passager_id" TEXT NOT NULL,
    CONSTRAINT "check_in_passager_id_fkey" FOREIGN KEY ("passager_id") REFERENCES "Passager" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "check_in_passager_id_key" ON "check_in"("passager_id");

-- CreateIndex
CREATE UNIQUE INDEX "plane_seat_airPlaneId_row_code_seat_code_key" ON "plane_seat"("airPlaneId", "row_code", "seat_code");
