/*
  Warnings:

  - A unique constraint covering the columns `[xenditId]` on the table `CustomerOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CustomerOrder_xenditId_key" ON "CustomerOrder"("xenditId");
