/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the `GameSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameSession" DROP CONSTRAINT "GameSession_contestantId_fkey";

-- DropForeignKey
ALTER TABLE "GameSession" DROP CONSTRAINT "GameSession_gameId_fkey";

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "createdAt",
ADD COLUMN     "endedAt" TIMESTAMP(3),
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "GameSession";
