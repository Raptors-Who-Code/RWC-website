-- AlterEnum
ALTER TYPE "VerificationCodeType" ADD VALUE 'EMAIL_UPDATE';

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '30 days';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userAddress" TEXT;
