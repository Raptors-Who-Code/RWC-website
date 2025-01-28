/*
  Warnings:

  - Made the column `profilePicUrl` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '30 days';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "profilePicUrl" SET NOT NULL;
