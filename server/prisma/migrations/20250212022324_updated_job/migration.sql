/*
  Warnings:

  - A unique constraint covering the columns `[jobLink]` on the table `jobs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_userId_fkey";

-- AlterTable
ALTER TABLE "jobs" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '30 days';

-- CreateIndex
CREATE UNIQUE INDEX "jobs_jobLink_key" ON "jobs"("jobLink");

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
