-- CreateEnum
CREATE TYPE "VerificationCodeType" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET', 'OTHER');

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '30 days';

-- CreateTable
CREATE TABLE "verification_codes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "VerificationCodeType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "verification_codes_userId_idx" ON "verification_codes"("userId");

-- AddForeignKey
ALTER TABLE "verification_codes" ADD CONSTRAINT "verification_codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
