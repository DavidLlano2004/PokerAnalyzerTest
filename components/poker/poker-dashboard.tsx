"use client"

import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  useUsedCards,
  usePlayerHand,
  useWinnerResult,
  useWinningCardIds,
  useCardActions,
  useCardSelector,
} from "@/hooks"
import { PlayerPanel } from "./player-panel"
import { CommunityCards } from "./community-cards"
import { WinnerPanel } from "./winner-panel"
import { HandRankings } from "./hand-rankings"
import { CardSelectorModal } from "./card-selector-modal"

export function PokerDashboard() {

  const usedCards = useUsedCards()
  const p1Hand = usePlayerHand(1)
  const p2Hand = usePlayerHand(2)
  const winnerResult = useWinnerResult()
  const winningCardIds = useWinningCardIds()
  const { resetAll } = useCardActions()
  const { isOpen, activeSlot, closeSelector } = useCardSelector()

  const hasAnyCards = usedCards.length > 0

  const selectorTitle = activeSlot
    ? activeSlot.type === "player1"
      ? `Player 1 - Card ${activeSlot.index + 1}`
      : activeSlot.type === "player2"
        ? `Player 2 - Card ${activeSlot.index + 1}`
        : `Community - ${["Flop 1", "Flop 2", "Flop 3", "Turn", "River"][activeSlot.index]}`
    : "Select a Card"

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-casino-slate/30 bg-casino-mid/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetAll}
              aria-label="Reset all cards"
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
                "bg-casino-slate/30 text-casino-pearl hover:bg-casino-gold hover:text-casino-deep",
                "font-sans text-sm font-medium",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-casino-gold"
              )}
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PlayerPanel
            playerNumber={1}
            handResult={p1Hand}
            isWinner={winnerResult?.winner === "player1"}
            isTie={winnerResult?.winner === "tie"}
            winningCardIds={winningCardIds}
          />
          <PlayerPanel
            playerNumber={2}
            handResult={p2Hand}
            isWinner={winnerResult?.winner === "player2"}
            isTie={winnerResult?.winner === "tie"}
            winningCardIds={winningCardIds}
          />
        </div>

        <CommunityCards winningCardIds={winningCardIds} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WinnerPanel result={winnerResult} hasCards={hasAnyCards} />
          </div>
          <HandRankings
            currentP1Rank={p1Hand?.rank}
            currentP2Rank={p2Hand?.rank}
          />
        </div>
      </main>

      <CardSelectorModal
        isOpen={isOpen}
        onClose={closeSelector}
        usedCards={usedCards}
        title={selectorTitle}
      />
    </div>
  )
}
