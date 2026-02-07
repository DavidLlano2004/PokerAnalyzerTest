"use client"

import { Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import type { HandResult } from "@/lib/poker"
import { cardId } from "@/lib/poker"
import { useCardActions, usePlayerCards } from "@/hooks"
import { PlayingCard } from "./playing-card"

interface PlayerPanelProps {
  playerNumber: 1 | 2
  handResult: HandResult | null
  isWinner: boolean
  isTie: boolean
  winningCardIds: Set<string>
}

export function PlayerPanel({
  playerNumber,
  handResult,
  isWinner,
  isTie,
  winningCardIds,
}: PlayerPanelProps) {
  // Get cards and actions store
  const { cards } = usePlayerCards(playerNumber)
  const { openSelector, clearCard } = useCardActions()

  const isP1 = playerNumber === 1
  const borderColor = isP1 ? "border-casino-emerald" : "border-casino-ruby"
  const labelColor = isP1 ? "text-casino-emerald" : "text-casino-ruby"

  const handleCardClick = (index: number) => {
    openSelector({ type: isP1 ? "player1" : "player2", index })
  }

  const handleCardClear = (index: number) => {
    clearCard({ type: isP1 ? "player1" : "player2", index })
  }

  return (
    <div
      className={cn(
        "relative rounded-xl border-2 p-6 transition-all duration-300",
        "bg-gradient-to-br from-casino-mid to-casino-deep",
        borderColor,
        isWinner && "shadow-[0_0_30px_hsl(43_56%_52%/0.4)]"
      )}
      role="region"
      aria-label={`Player ${playerNumber} hand`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2
          className={cn(
            "text-lg font-display tracking-wider uppercase",
            labelColor
          )}
        >
          Player {playerNumber}
        </h2>
        {isWinner && (
          <div className="flex items-center gap-1.5 animate-trophy-bounce">
            <Trophy className="w-5 h-5 text-casino-gold" />
            <span className="text-sm font-sans font-semibold text-casino-gold">
              Winner
            </span>
          </div>
        )}
        {isTie && (
          <span className="text-sm font-sans font-semibold text-casino-amber">
            Tie
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 mb-4">
        {[0, 1].map((i) => {
          const c = cards[i]
          return (
            <div
              key={i}
              onContextMenu={(e) => {
                if (c) {
                  e.preventDefault()
                  handleCardClear(i)
                }
              }}
            >
              <PlayingCard
                card={c}
                isEmpty={!c}
                isHighlighted={c ? winningCardIds.has(cardId(c)) : false}
                onClick={() => handleCardClick(i)}
                label={`Hole card ${i + 1}`}
              />
            </div>
          )
        })}
      </div>

      <div
        className={cn(
          "text-sm font-sans",
          handResult && handResult.bestCards.length > 0
            ? "text-casino-pearl font-semibold"
            : "text-casino-silver"
        )}
      >
        {handResult && handResult.bestCards.length > 0
          ? handResult.description
          : "Select cards to evaluate"}
      </div>
    </div>
  )
}
