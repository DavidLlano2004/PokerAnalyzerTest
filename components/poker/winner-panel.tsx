"use client"

import { Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import type { WinnerResult } from "@/lib/poker"
import { cardLabel } from "@/lib/poker"

interface WinnerPanelProps {
  result: WinnerResult | null
  hasCards: boolean
}

export function WinnerPanel({ result, hasCards }: WinnerPanelProps) {
  if (!hasCards) {
    return (
      <div className="rounded-xl border border-casino-slate/30 bg-casino-mid/50 p-6">
        <div className="text-center">
          <p className="text-casino-silver text-sm font-sans">
            Select cards to see analysis
          </p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="rounded-xl border border-casino-slate/30 bg-casino-mid/50 p-6">
        <div className="text-center">
          <p className="text-casino-silver text-sm font-sans">
            Each player needs at least 2 cards for evaluation
          </p>
        </div>
      </div>
    )
  }

  const { winner, player1Hand, player2Hand } = result
  const isTie = winner === "tie"

  const winnerLabel =
    winner === "player1"
      ? "Player 1"
      : winner === "player2"
        ? "Player 2"
        : null

  const winnerHand =
    winner === "player1"
      ? player1Hand
      : winner === "player2"
        ? player2Hand
        : player1Hand

  return (
    <div
      className={cn(
        "rounded-xl border-2 p-6 transition-all duration-300",
        "bg-gradient-to-r from-casino-mid via-casino-deep to-casino-mid",
        isTie
          ? "border-casino-amber/50"
          : "border-t-casino-gold border-x-casino-slate/30 border-b-casino-slate/30"
      )}
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        {!isTie && (
          <Trophy className="w-6 h-6 text-casino-gold animate-trophy-bounce" />
        )}
        <h2 className="text-2xl font-display tracking-wider uppercase text-casino-pearl">
          {isTie ? "It's a Tie!" : `${winnerLabel} Wins!`}
        </h2>
        {!isTie && (
          <Trophy className="w-6 h-6 text-casino-gold animate-trophy-bounce" />
        )}
      </div>

      <div className="text-center mb-4">
        <span
          className={cn(
            "text-lg font-sans font-semibold",
            isTie
              ? "text-casino-amber"
              : winner === "player1"
                ? "text-casino-emerald"
                : "text-casino-ruby"
          )}
        >
          {winnerHand.rank}
        </span>
        {!isTie && (
          <p className="text-sm text-casino-silver mt-1 font-sans">
            {winnerHand.description}
          </p>
        )}
        {isTie && (
          <p className="text-sm text-casino-silver mt-1 font-sans">
            Both players hold {player1Hand.rank}
          </p>
        )}
      </div>

      {winnerHand.bestCards.length > 0 && (
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs text-casino-silver font-sans mr-2 uppercase tracking-wide">
            Best Hand:
          </span>
          {winnerHand.bestCards.map((card, i) => {
            const isRed =
              card.suit === "hearts" || card.suit === "diamonds"
            return (
              <span
                key={`${card.rank}-${card.suit}-${i}`}
                className={cn(
                  "px-2 py-1 rounded font-serif font-bold text-sm",
                  "bg-casino-deep border border-casino-gold/30",
                  isRed ? "text-casino-ruby" : "text-casino-pearl"
                )}
              >
                {cardLabel(card)}
              </span>
            )
          })}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-casino-slate/20 grid grid-cols-2 gap-4">
        <div className="text-center">
          <span className="text-xs text-casino-emerald font-sans uppercase tracking-wide block mb-1">
            Player 1
          </span>
          <span className="text-sm text-casino-pearl font-sans font-medium">
            {player1Hand.rank}
          </span>
        </div>
        <div className="text-center">
          <span className="text-xs text-casino-ruby font-sans uppercase tracking-wide block mb-1">
            Player 2
          </span>
          <span className="text-sm text-casino-pearl font-sans font-medium">
            {player2Hand.rank}
          </span>
        </div>
      </div>
    </div>
  )
}
