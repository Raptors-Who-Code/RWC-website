/*
  Warnings:

  - The `jobLevel` column on the `jobs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `jobLocation` on the `jobs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `jobHoursType` on the `jobs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "jobLocation",
ADD COLUMN     "jobLocation" TEXT NOT NULL,
DROP COLUMN "jobLevel",
ADD COLUMN     "jobLevel" TEXT,
DROP COLUMN "jobHoursType",
ADD COLUMN     "jobHoursType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '30 days';

-- DropEnum
DROP TYPE "JobHourTypes";

-- DropEnum
DROP TYPE "JobLevel";

-- DropEnum
DROP TYPE "JobLocation";
