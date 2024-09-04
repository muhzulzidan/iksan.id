/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `DownloadLink` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId,productSlug]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DownloadLink_link_key" ON "DownloadLink"("link");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_orderId_productSlug_key" ON "OrderItem"("orderId", "productSlug");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");
