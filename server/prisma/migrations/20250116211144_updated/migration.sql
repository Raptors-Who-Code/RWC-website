/*
  Warnings:

  - The values [HYPBRID] on the enum `JobLocation` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "JobLocation_new" AS ENUM ('ONSITE', 'REMOTE', 'HYBRID', 'OTHER');
ALTER TABLE "jobs" ALTER COLUMN "jobLocation" TYPE "JobLocation_new" USING ("jobLocation"::text::"JobLocation_new");
ALTER TYPE "JobLocation" RENAME TO "JobLocation_old";
ALTER TYPE "JobLocation_new" RENAME TO "JobLocation";
DROP TYPE "JobLocation_old";
COMMIT;

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '30 days';
