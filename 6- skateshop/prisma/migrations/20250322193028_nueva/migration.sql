/*
  Warnings:

  - You are about to drop the column `type` on the `ProductImage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId,isMain]` on the table `ProductImage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId,isHover]` on the table `ProductImage` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "type",
ADD COLUMN     "isGallery" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isHover" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isMain" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "ProductImage_productId_isMain_key" ON "ProductImage"("productId", "isMain");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImage_productId_isHover_key" ON "ProductImage"("productId", "isHover");
