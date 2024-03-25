-- CreateTable
CREATE TABLE "RegistrationTime" (
    "id" SERIAL NOT NULL,
    "openTime" TIMESTAMP(3) NOT NULL,
    "closeTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegistrationTime_pkey" PRIMARY KEY ("id")
);
