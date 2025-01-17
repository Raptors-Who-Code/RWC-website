/*
  Warnings:

  - Added the required column `jobType` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'REMOTE', 'OTHER');

-- DropForeignKey
ALTER TABLE "registered_events" DROP CONSTRAINT "registered_events_eventId_fkey";

-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "jobType" "JobType" NOT NULL;

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '30 days';

-- AddForeignKey
ALTER TABLE "registered_events" ADD CONSTRAINT "registered_events_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
