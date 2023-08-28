/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Customer" (
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3),
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "street_name" TEXT NOT NULL,
    "house_number" TEXT NOT NULL,
    "complements" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("cpf")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
