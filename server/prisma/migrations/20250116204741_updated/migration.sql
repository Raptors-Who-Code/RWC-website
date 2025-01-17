/*
  Warnings:

  - You are about to drop the column `jobType` on the `jobs` table. All the data in the column will be lost.
  - The `jobLevel` column on the `jobs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `internship` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobHours` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobLocation` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobLevel" AS ENUM ('JUNIOR', 'MID_LEVEL', 'SENIOR', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "JobLocation" AS ENUM ('ONSITE', 'REMOTE', 'HYPBRID', 'OTHER');

-- CreateEnum
CREATE TYPE "JobHours" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT');

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "jobType",
ADD COLUMN     "internship" BOOLEAN NOT NULL,
ADD COLUMN     "jobHours" "JobHours" NOT NULL,
ADD COLUMN     "jobLocation" "JobLocation" NOT NULL,
DROP COLUMN "jobLevel",
ADD COLUMN     "jobLevel" "JobLevel";

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '30 days';

-- DropEnum
DROP TYPE "JobType";
