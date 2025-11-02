/*
  Warnings:

  - You are about to drop the column `adminName` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `Grade` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `studentNumber` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentEmail]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `grade` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentEmail` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Student_studentNumber_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "adminName";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "Grade",
DROP COLUMN "password",
DROP COLUMN "studentNumber",
ADD COLUMN     "grade" INTEGER NOT NULL,
ADD COLUMN     "studentEmail" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "StudentPassword" (
    "studentEmail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "defaultChangeFlag" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentPassword_pkey" PRIMARY KEY ("studentEmail")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentEmail_key" ON "Student"("studentEmail");

-- AddForeignKey
ALTER TABLE "StudentPassword" ADD CONSTRAINT "StudentPassword_studentEmail_fkey" FOREIGN KEY ("studentEmail") REFERENCES "Student"("studentEmail") ON DELETE RESTRICT ON UPDATE CASCADE;
