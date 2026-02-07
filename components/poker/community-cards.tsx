"use client"

import { cn } from "@/lib/utils"
import { cardId } from "@/lib/poker"
import { useCommunityCards, useCardActions } from "@/hooks"
import { PlayingCard } from "./playing-card"

interface CommunityCardsProps {
  winningCardIds: Set<string>
}

const SLOT_LABELS = ["Flop 1", "Flop 2", "Flop 3", "Turn", "River"]

export function CommunityCards({ winningCardIds }: CommunityCardsProps) {
  // Get cards and actions directly from Zustand store
  const { cards } = useCommunityCards()
  const { openSelector, clearCard } = useCardActions()

  const handleCardClick = (index: number) => {
    openSelector({ type: "community", index })
  }

  const handleCardClear = (index: number) => {
    clearCard({ type: "community", index })
  }

  return (
    <div
      className={cn(
        "relative rounded-xl border-2 border-casino-slate/30 p-6",
        "bg-gradient-to-b from-[hsl(153_53%_16%)] to-[hsl(153_53%_12%)]",
        "shadow-[inset_0_2px_20px_rgba(0,0,0,0.3)]"
      )}
    >
      <h2 className="text-center text-sm font-display tracking-[0.2em] uppercase text-casino-gold mb-4 relative z-10">
        Community Cards
      </h2>

      <div className="flex items-center justify-center gap-3 relative z-10 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-3">
          {[0, 1, 2].map((i) => {
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
                  label={SLOT_LABELS[i]}
                />
              </div>
            )
          })}
        </div>

        <div className="w-px h-16 bg-casino-gold/20 hidden sm:block" />

        <div
          onContextMenu={(e) => {
            if (cards[3]) {
              e.preventDefault()
              handleCardClear(3)
            }
          }}
        >
          <PlayingCard
            card={cards[3]}
            isEmpty={!cards[3]}
            isHighlighted={cards[3] ? winningCardIds.has(cardId(cards[3])) : false}
            onClick={() => handleCardClick(3)}
            label={SLOT_LABELS[3]}
          />
        </div>

        <div className="w-px h-16 bg-casino-gold/20 hidden sm:block" />

        <div
          onContextMenu={(e) => {
            if (cards[4]) {
              e.preventDefault()
              handleCardClear(4)
            }
          }}
        >
          <PlayingCard
            card={cards[4]}
            isEmpty={!cards[4]}
            isHighlighted={cards[4] ? winningCardIds.has(cardId(cards[4])) : false}
            onClick={() => handleCardClick(4)}
            label={SLOT_LABELS[4]}
          />
        </div>
      </div>
    </div>
  )
}
