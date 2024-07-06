/*
  Warnings:

  - Made the column `attributes` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "attributes" SET NOT NULL;
