-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MODERATOR', 'MEMBER', 'GUEST', 'ALUMNI');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'GUEST',
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
