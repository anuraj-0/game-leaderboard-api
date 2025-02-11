/*
  Warnings:

  - A unique constraint covering the columns `[gameId,contestantId]` on the table `GameSession` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "GameSession_gameId_key";

-- CreateIndex
CREATE UNIQUE INDEX "GameSession_gameId_contestantId_key" ON "GameSession"("gameId", "contestantId");
