-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "contestantId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_gameId_contestantId_key" ON "Participant"("gameId", "contestantId");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_contestantId_fkey" FOREIGN KEY ("contestantId") REFERENCES "Contestant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
