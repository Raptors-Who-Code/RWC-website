-- AlterTable
ALTER TABLE "events" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '30 days';
