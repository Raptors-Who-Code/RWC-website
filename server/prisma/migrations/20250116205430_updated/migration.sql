/*
  Warnings:

  - You are about to drop the column `jobHours` on the `jobs` table. All the data in the column will be lost.
  - Added the required column `jobHoursType` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobHourTypes" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT');

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "jobHours",
ADD COLUMN     "jobHoursType" "JobHourTypes" NOT NULL;

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '30 days';

-- DropEnum
DROP TYPE "JobHours";
