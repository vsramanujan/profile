-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "note" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createTime" DATETIME NOT NULL,
    "updateTime" DATETIME NOT NULL
);
