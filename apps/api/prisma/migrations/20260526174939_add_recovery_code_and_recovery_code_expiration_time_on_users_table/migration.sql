-- AlterTable
ALTER TABLE "users" ADD COLUMN     "recoveryCode" TEXT,
ADD COLUMN     "recoveryCodeExpiresAt" TIMESTAMP(3);
