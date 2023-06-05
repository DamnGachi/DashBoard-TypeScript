-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChatRoom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "link" TEXT,
    "avatar" TEXT,
    "description" TEXT,
    "pinMessage" TEXT,
    "userId" TEXT,
    CONSTRAINT "ChatRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ChatRoom" ("avatar", "description", "id", "link", "name", "pinMessage", "userId") SELECT "avatar", "description", "id", "link", "name", "pinMessage", "userId" FROM "ChatRoom";
DROP TABLE "ChatRoom";
ALTER TABLE "new_ChatRoom" RENAME TO "ChatRoom";
CREATE UNIQUE INDEX "ChatRoom_link_key" ON "ChatRoom"("link");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
