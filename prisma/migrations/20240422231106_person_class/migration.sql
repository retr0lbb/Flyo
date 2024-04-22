-- CreateTable
CREATE TABLE "Passager" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_plane_seat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "airPlaneId" TEXT NOT NULL,
    "passagerId" TEXT,
    CONSTRAINT "plane_seat_airPlaneId_fkey" FOREIGN KEY ("airPlaneId") REFERENCES "AirPlane" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "plane_seat_passagerId_fkey" FOREIGN KEY ("passagerId") REFERENCES "Passager" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_plane_seat" ("airPlaneId", "id") SELECT "airPlaneId", "id" FROM "plane_seat";
DROP TABLE "plane_seat";
ALTER TABLE "new_plane_seat" RENAME TO "plane_seat";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Passager_email_key" ON "Passager"("email");
