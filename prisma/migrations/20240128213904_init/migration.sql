-- CreateTable
CREATE TABLE "Tenant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "agreement" BOOLEAN NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);
