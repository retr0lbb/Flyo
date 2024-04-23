-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AirPlane" (
    "captain_name" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "max_passagers" INTEGER NOT NULL,
    "plane_model" TEXT NOT NULL,
    "is_avaiable" BOOLEAN NOT NULL DEFAULT true,
    "flightId" TEXT,
    CONSTRAINT "AirPlane_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_AirPlane" ("captain_name", "flightId", "id", "is_avaiable", "max_passagers", "plane_model") SELECT "captain_name", "flightId", "id", "is_avaiable", "max_passagers", "plane_model" FROM "AirPlane";
DROP TABLE "AirPlane";
ALTER TABLE "new_AirPlane" RENAME TO "AirPlane";
CREATE UNIQUE INDEX "AirPlane_flightId_key" ON "AirPlane"("flightId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
