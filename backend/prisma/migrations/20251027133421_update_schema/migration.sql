/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `categoryId` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `MinorCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `minorCategoryId` column on the `MinorCategory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `studentId` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `SubCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `subCategoryId` column on the `SubCategory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[categoryName]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[minorCategoryName]` on the table `MinorCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[statusName]` on the table `Status` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subCategoryName]` on the table `SubCategory` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `subCategoryId` on the `MinorCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `Status` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `minorCategoryId` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `categoryId` on the `SubCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."MinorCategory" DROP CONSTRAINT "MinorCategory_subCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Student" DROP CONSTRAINT "Student_minorCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Student" DROP CONSTRAINT "Student_statusId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SubCategory" DROP CONSTRAINT "SubCategory_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "categoryId",
ADD COLUMN     "categoryId" SERIAL NOT NULL,
ALTER COLUMN "categoryName" SET DATA TYPE TEXT,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId");

-- AlterTable
ALTER TABLE "MinorCategory" DROP CONSTRAINT "MinorCategory_pkey",
DROP COLUMN "minorCategoryId",
ADD COLUMN     "minorCategoryId" SERIAL NOT NULL,
ALTER COLUMN "minorCategoryName" SET DATA TYPE TEXT,
DROP COLUMN "subCategoryId",
ADD COLUMN     "subCategoryId" INTEGER NOT NULL,
ADD CONSTRAINT "MinorCategory_pkey" PRIMARY KEY ("minorCategoryId");

-- AlterTable
ALTER TABLE "Status" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "minorCategoryId",
ADD COLUMN     "minorCategoryId" INTEGER NOT NULL,
DROP COLUMN "studentId",
ADD COLUMN     "studentId" SERIAL NOT NULL,
ALTER COLUMN "statusId" DROP NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("studentId");

-- AlterTable
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_pkey",
DROP COLUMN "subCategoryId",
ADD COLUMN     "subCategoryId" SERIAL NOT NULL,
ALTER COLUMN "subCategoryName" SET DATA TYPE TEXT,
DROP COLUMN "categoryId",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("subCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryName_key" ON "Category"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "MinorCategory_minorCategoryName_key" ON "MinorCategory"("minorCategoryName");

-- CreateIndex
CREATE UNIQUE INDEX "Status_statusName_key" ON "Status"("statusName");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_subCategoryName_key" ON "SubCategory"("subCategoryName");

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MinorCategory" ADD CONSTRAINT "MinorCategory_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("subCategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_minorCategoryId_fkey" FOREIGN KEY ("minorCategoryId") REFERENCES "MinorCategory"("minorCategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("statusId") ON DELETE SET NULL ON UPDATE CASCADE;
