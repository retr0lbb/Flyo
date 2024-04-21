-- CreateTable
CREATE TABLE "AirPlane" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "max_passagers" INTEGER NOT NULL,
    "destiny" TEXT NOT NULL,
    "plane_model" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "plane_seat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "airPlaneId" TEXT NOT NULL,
    CONSTRAINT "plane_seat_airPlaneId_fkey" FOREIGN KEY ("airPlaneId") REFERENCES "AirPlane" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
