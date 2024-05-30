/*
  Warnings:

  - You are about to drop the column `downloadLink` on the `CustomerDownloadLink` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CustomerDownloadLink" DROP COLUMN "downloadLink";

-- CreateTable
CREATE TABLE "DownloadLink" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "customerDownloadLinkId" INTEGER NOT NULL,

    CONSTRAINT "DownloadLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DownloadLink" ADD CONSTRAINT "DownloadLink_customerDownloadLinkId_fkey" FOREIGN KEY ("customerDownloadLinkId") REFERENCES "CustomerDownloadLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
