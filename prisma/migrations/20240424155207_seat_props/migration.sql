/*
  Warnings:

  - Added the required column `row_code` to the `plane_seat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seat_code` to the `plane_seat` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_plane_seat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "airPlaneId" TEXT NOT NULL,
    "passagerId" TEXT,
    "row_code" INTEGER NOT NULL,
    "seat_code" TEXT NOT NULL,
    CONSTRAINT "plane_seat_airPlaneId_fkey" FOREIGN KEY ("airPlaneId") REFERENCES "AirPlane" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "plane_seat_passagerId_fkey" FOREIGN KEY ("passagerId") REFERENCES "Passager" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_plane_seat" ("airPlaneId", "id", "passagerId") SELECT "airPlaneId", "id", "passagerId" FROM "plane_seat";
DROP TABLE "plane_seat";
ALTER TABLE "new_plane_seat" RENAME TO "plane_seat";
CREATE UNIQUE INDEX "plane_seat_airPlaneId_passagerId_key" ON "plane_seat"("airPlaneId", "passagerId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
