/*
  Warnings:

  - Made the column `changed_at` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "registered_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changed_at" DATETIME NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_verified" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("avatar", "changed_at", "email", "hashed_password", "id", "is_active", "is_verified", "registered_at", "role_id", "username") SELECT "avatar", "changed_at", "email", "hashed_password", "id", coalesce("is_active", true) AS "is_active", coalesce("is_verified", false) AS "is_verified", coalesce("registered_at", CURRENT_TIMESTAMP) AS "registered_at", "role_id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
