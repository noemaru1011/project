/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MinorCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Status` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Status` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Student` table. All the data in the column will be lost.
  - The primary key for the `SubCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `studentId` was added to the `Student` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

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
ALTER COLUMN "categoryId" DROP DEFAULT,
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId");
DROP SEQUENCE "Category_categoryId_seq";

-- AlterTable
ALTER TABLE "MinorCategory" DROP CONSTRAINT "MinorCategory_pkey",
ALTER COLUMN "minorCategoryId" DROP DEFAULT,
ALTER COLUMN "minorCategoryId" SET DATA TYPE TEXT,
ALTER COLUMN "subCategoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MinorCategory_pkey" PRIMARY KEY ("minorCategoryId");
DROP SEQUENCE "MinorCategory_minorCategoryId_seq";

-- AlterTable
ALTER TABLE "Status" DROP CONSTRAINT "Status_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "statusId" DROP DEFAULT,
ALTER COLUMN "statusId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Status_pkey" PRIMARY KEY ("statusId");
DROP SEQUENCE "Status_statusId_seq";

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "id",
ADD COLUMN     "studentId" TEXT NOT NULL,
ALTER COLUMN "minorCategoryId" SET DATA TYPE TEXT,
ALTER COLUMN "statusId" SET DATA TYPE TEXT,
ALTER COLUMN "other" DROP NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("studentId");

-- AlterTable
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_pkey",
ALTER COLUMN "subCategoryId" DROP DEFAULT,
ALTER COLUMN "subCategoryId" SET DATA TYPE TEXT,
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("subCategoryId");
DROP SEQUENCE "SubCategory_subCategoryId_seq";

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MinorCategory" ADD CONSTRAINT "MinorCategory_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("subCategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_minorCategoryId_fkey" FOREIGN KEY ("minorCategoryId") REFERENCES "MinorCategory"("minorCategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("statusId") ON DELETE RESTRICT ON UPDATE CASCADE;
