/*
  Warnings:

  - Added the required column `fly_code` to the `AirPlane` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AirPlane" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "max_passagers" INTEGER NOT NULL,
    "destiny" TEXT NOT NULL,
    "plane_model" TEXT NOT NULL,
    "fly_code" TEXT NOT NULL
);
INSERT INTO "new_AirPlane" ("destiny", "id", "max_passagers", "plane_model") SELECT "destiny", "id", "max_passagers", "plane_model" FROM "AirPlane";
DROP TABLE "AirPlane";
ALTER TABLE "new_AirPlane" RENAME TO "AirPlane";
CREATE UNIQUE INDEX "AirPlane_fly_code_key" ON "AirPlane"("fly_code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
