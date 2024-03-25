-- CreateTable
CREATE TABLE "DownloadIksanId" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "downloadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DownloadIksanId_pkey" PRIMARY KEY ("id")
);
