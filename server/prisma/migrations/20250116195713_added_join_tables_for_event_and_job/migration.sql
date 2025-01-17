/*
  Warnings:

  - You are about to drop the `event_votes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `votes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `jobLevel` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobLink` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event_votes" DROP CONSTRAINT "event_votes_eventId_fkey";

-- DropForeignKey
ALTER TABLE "event_votes" DROP CONSTRAINT "event_votes_userId_fkey";

-- DropForeignKey
ALTER TABLE "votes" DROP CONSTRAINT "votes_jobId_fkey";

-- DropForeignKey
ALTER TABLE "votes" DROP CONSTRAINT "votes_userId_fkey";

-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "jobLevel" TEXT NOT NULL,
ADD COLUMN     "jobLink" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '30 days';

-- DropTable
DROP TABLE "event_votes";

-- DropTable
DROP TABLE "votes";

-- CreateTable
CREATE TABLE "registered_events" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "registered_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applied_jobs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "applied_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "registered_events_userId_eventId_idx" ON "registered_events"("userId", "eventId");

-- CreateIndex
CREATE INDEX "applied_jobs_userId_jobId_idx" ON "applied_jobs"("userId", "jobId");

-- AddForeignKey
ALTER TABLE "registered_events" ADD CONSTRAINT "registered_events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registered_events" ADD CONSTRAINT "registered_events_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applied_jobs" ADD CONSTRAINT "applied_jobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applied_jobs" ADD CONSTRAINT "applied_jobs_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
