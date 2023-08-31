/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `publisher_id` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "publisher_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Publisher" (
    "id_p" TEXT NOT NULL,
    "name_p" TEXT NOT NULL,
    "city_p" TEXT NOT NULL,
    "state_p" TEXT NOT NULL,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id_p")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_code_key" ON "users"("code");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_publisher_id_fkey" FOREIGN KEY ("publisher_id") REFERENCES "Publisher"("id_p") ON DELETE RESTRICT ON UPDATE CASCADE;
