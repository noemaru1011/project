/*
  Warnings:

  - The primary key for the `Status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `statusId` column on the `Status` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `statusId` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."Student" DROP CONSTRAINT "Student_statusId_fkey";

-- AlterTable
ALTER TABLE "Status" DROP CONSTRAINT "Status_pkey",
DROP COLUMN "statusId",
ADD COLUMN     "statusId" SERIAL NOT NULL,
ADD CONSTRAINT "Status_pkey" PRIMARY KEY ("statusId");

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "statusId",
ADD COLUMN     "statusId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("statusId") ON DELETE RESTRICT ON UPDATE CASCADE;
