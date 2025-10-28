/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `endTime` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `other` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `Student` table. All the data in the column will be lost.
  - Added the required column `Grade` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Student" DROP CONSTRAINT "Student_statusId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "endTime",
DROP COLUMN "other",
DROP COLUMN "startTime",
DROP COLUMN "statusId",
ADD COLUMN     "Grade" INTEGER NOT NULL,
ADD COLUMN     "deleteFlag" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "departmentId" INTEGER NOT NULL,
ALTER COLUMN "studentId" DROP DEFAULT,
ALTER COLUMN "studentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("studentId");
DROP SEQUENCE "Student_studentId_seq";

-- CreateTable
CREATE TABLE "Department" (
    "departmentId" SERIAL NOT NULL,
    "departmentName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("departmentId")
);

-- CreateTable
CREATE TABLE "History" (
    "historyId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL,
    "other" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "validFlag" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("historyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_departmentName_key" ON "Department"("departmentName");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("departmentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("statusId") ON DELETE RESTRICT ON UPDATE CASCADE;
