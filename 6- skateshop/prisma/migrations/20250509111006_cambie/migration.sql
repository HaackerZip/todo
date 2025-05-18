/*
  Warnings:

  - You are about to drop the column `isGallery` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `isHover` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `isMain` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `ProductImage` table. All the data in the column will be lost.
  - Added the required column `type` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('MAIN', 'HOVER', 'GALLERY');

-- DropIndex
DROP INDEX "ProductImage_productId_isHover_key";

-- DropIndex
DROP INDEX "ProductImage_productId_isMain_key";

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "isGallery",
DROP COLUMN "isHover",
DROP COLUMN "isMain",
DROP COLUMN "order",
ADD COLUMN     "type" "ImageType" NOT NULL;

-- CreateIndex
CREATE INDEX "ProductImage_productId_type_idx" ON "ProductImage"("productId", "type");
