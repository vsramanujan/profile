-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "note" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createTime" DATETIME NOT NULL,
    "updateTime" DATETIME NOT NULL,
    "bgColor" TEXT NOT NULL DEFAULT '#ffcf7d'
);
INSERT INTO "new_Note" ("active", "createTime", "id", "note", "updateTime") SELECT "active", "createTime", "id", "note", "updateTime" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
