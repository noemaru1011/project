/*
  Warnings:

  - You are about to drop the column `adminNumber` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `studentEmail` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Admin_adminNumber_key";

-- DropIndex
DROP INDEX "public"."Student_studentEmail_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "adminNumber",
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "studentEmail",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
