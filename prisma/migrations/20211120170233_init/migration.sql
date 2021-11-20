-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL,
    "updateTime" TIMESTAMP(3) NOT NULL,
    "bgColor" TEXT NOT NULL DEFAULT E'#ffcf7d',

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);
