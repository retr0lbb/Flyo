/*
  Warnings:

  - You are about to drop the column `destiny` on the `AirPlane` table. All the data in the column will be lost.
  - You are about to drop the column `fly_code` on the `AirPlane` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Flight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "destiny" TEXT NOT NULL,
    "flight_date" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AirPlane" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "max_passagers" INTEGER NOT NULL,
    "plane_model" TEXT NOT NULL
);
INSERT INTO "new_AirPlane" ("id", "max_passagers", "plane_model") SELECT "id", "max_passagers", "plane_model" FROM "AirPlane";
DROP TABLE "AirPlane";
ALTER TABLE "new_AirPlane" RENAME TO "AirPlane";
CREATE TABLE "new_Passager" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "flightId" TEXT,
    CONSTRAINT "Passager_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Passager" ("email", "id", "name") SELECT "email", "id", "name" FROM "Passager";
DROP TABLE "Passager";
ALTER TABLE "new_Passager" RENAME TO "Passager";
CREATE UNIQUE INDEX "Passager_email_key" ON "Passager"("email");
CREATE TABLE "new_plane_seat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "airPlaneId" TEXT NOT NULL,
    "passagerId" TEXT,
    CONSTRAINT "plane_seat_airPlaneId_fkey" FOREIGN KEY ("airPlaneId") REFERENCES "AirPlane" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "plane_seat_passagerId_fkey" FOREIGN KEY ("passagerId") REFERENCES "Passager" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_plane_seat" ("airPlaneId", "id", "passagerId") SELECT "airPlaneId", "id", "passagerId" FROM "plane_seat";
DROP TABLE "plane_seat";
ALTER TABLE "new_plane_seat" RENAME TO "plane_seat";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
