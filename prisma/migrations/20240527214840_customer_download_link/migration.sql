-- CreateTable
CREATE TABLE "CustomerDownloadLink" (
    "id" SERIAL NOT NULL,
    "customerIksanId" INTEGER NOT NULL,
    "downloadLink" TEXT NOT NULL,

    CONSTRAINT "CustomerDownloadLink_pkey" PRIMARY KEY ("id")
);
