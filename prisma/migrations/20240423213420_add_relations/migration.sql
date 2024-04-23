/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Flight` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `captain_name` to the `AirPlane` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flightId` to the `AirPlane` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AirPlane" (
    "captain_name" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "max_passagers" INTEGER NOT NULL,
    "plane_model" TEXT NOT NULL,
    "flightId" TEXT NOT NULL,
    CONSTRAINT "AirPlane_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AirPlane" ("id", "max_passagers", "plane_model") SELECT "id", "max_passagers", "plane_model" FROM "AirPlane";
DROP TABLE "AirPlane";
ALTER TABLE "new_AirPlane" RENAME TO "AirPlane";
CREATE UNIQUE INDEX "AirPlane_flightId_key" ON "AirPlane"("flightId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Flight_id_key" ON "Flight"("id");
