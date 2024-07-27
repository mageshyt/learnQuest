/*
  Warnings:

  - A unique constraint covering the columns `[assetId]` on the table `MuxData` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserProgress_userId_chapterId_idx";

-- AlterTable
ALTER TABLE "MuxData" ADD COLUMN     "trackId" TEXT;

-- CreateIndex
CREATE INDEX "Category_name_idx" ON "Category"("name");

-- CreateIndex
CREATE INDEX "MuxData_assetId_playbackId_idx" ON "MuxData"("assetId", "playbackId");

-- CreateIndex
CREATE UNIQUE INDEX "MuxData_assetId_key" ON "MuxData"("assetId");

-- CreateIndex
CREATE INDEX "UserProgress_chapterId_idx" ON "UserProgress"("chapterId");
