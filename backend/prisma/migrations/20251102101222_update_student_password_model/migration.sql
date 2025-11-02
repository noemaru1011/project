/*
  Warnings:

  - The primary key for the `StudentPassword` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `studentEmail` on the `StudentPassword` table. All the data in the column will be lost.
  - Added the required column `studentId` to the `StudentPassword` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."StudentPassword" DROP CONSTRAINT "StudentPassword_studentEmail_fkey";

-- AlterTable
ALTER TABLE "StudentPassword" DROP CONSTRAINT "StudentPassword_pkey",
DROP COLUMN "studentEmail",
ADD COLUMN     "studentId" TEXT NOT NULL,
ADD CONSTRAINT "StudentPassword_pkey" PRIMARY KEY ("studentId");

-- AddForeignKey
ALTER TABLE "StudentPassword" ADD CONSTRAINT "StudentPassword_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;
