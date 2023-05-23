-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "registered_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "changed_at" DATETIME,
    "is_active" BOOLEAN DEFAULT true,
    "is_verified" BOOLEAN DEFAULT false
);
INSERT INTO "new_User" ("avatar", "changed_at", "email", "hashed_password", "id", "is_active", "is_verified", "registered_at", "role_id", "username") SELECT "avatar", "changed_at", "email", "hashed_password", "id", "is_active", "is_verified", "registered_at", "role_id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
