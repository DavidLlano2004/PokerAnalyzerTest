"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Card, Suit } from "@/lib/poker"
import { SUITS, RANKS, SUIT_SYMBOLS, cardId } from "@/lib/poker"
import { usePokerStore } from "@/store"

interface CardSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  usedCards: Card[]
  title?: string
}

type FilterSuit = "all" | Suit

export function CardSelectorModal({
  isOpen,
  onClose,
  usedCards,
  title = "Select a Card",
}: CardSelectorModalProps) {
  const [filter, setFilter] = useState<FilterSuit>("all")

  // Get selectCard action from store
  const selectCard = usePokerStore((state) => state.selectCard)

  const usedCardIds = new Set(usedCards.map(cardId))
  const isUsed = (card: Card) => usedCardIds.has(cardId(card))

  // Handle card selection
  const handleSelect = (card: Card) => {
    selectCard(card)
  }

  // Close on escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const filteredSuits: Suit[] = filter === "all" ? [...SUITS] : [filter]

  const filterButtons: { label: string; value: FilterSuit; color?: string }[] = [
    { label: "All", value: "all" },
    { label: SUIT_SYMBOLS.spades, value: "spades" },
    { label: SUIT_SYMBOLS.hearts, value: "hearts", color: "text-casino-ruby" },
    { label: SUIT_SYMBOLS.diamonds, value: "diamonds", color: "text-casino-ruby" },
    { label: SUIT_SYMBOLS.clubs, value: "clubs" },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-casino-deep/95 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl mx-4 bg-casino-mid border border-casino-slate/50 rounded-xl shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-casino-slate/30">
          <h2 className="text-xl font-display tracking-wider text-casino-pearl uppercase">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-casino-silver hover:text-casino-pearl hover:bg-casino-slate/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-casino-gold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suit Filter Buttons */}
        <div className="flex items-center gap-2 px-6 pt-4">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              type="button"
              onClick={() => setFilter(btn.value)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-sans font-medium transition-all duration-150",
                "border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-casino-gold",
                filter === btn.value
                  ? "bg-casino-gold text-casino-deep border-casino-gold shadow-[0_0_12px_hsl(43_56%_52%/0.3)]"
                  : "border-casino-slate/50 text-casino-silver hover:border-casino-gold/50 hover:text-casino-pearl",
                btn.color && filter !== btn.value && btn.color
              )}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Card Grid */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {filteredSuits.map((suit) => (
            <div key={suit} className="mb-6 last:mb-0">
              {/* Suit Header */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={cn(
                    "text-lg",
                    suit === "hearts" || suit === "diamonds"
                      ? "text-casino-ruby"
                      : "text-casino-pearl"
                  )}
                >
                  {SUIT_SYMBOLS[suit]}
                </span>
                <span className="text-sm font-sans text-casino-silver uppercase tracking-wide">
                  {suit}
                </span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-7 sm:grid-cols-13 gap-2">
                {RANKS.map((rank) => {
                  const card: Card = { rank, suit }
                  const used = isUsed(card)
                  const isRed = suit === "hearts" || suit === "diamonds"

                  return (
                    <button
                      key={cardId(card)}
                      type="button"
                      disabled={used}
                      onClick={() => handleSelect(card)}
                      className={cn(
                        "relative flex flex-col items-center justify-center",
                        "w-full aspect-[5/7] rounded-md border-2 transition-all duration-150",
                        "font-serif font-bold",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-casino-gold",
                        used
                          ? "opacity-30 cursor-not-allowed border-casino-slate/20 bg-casino-slate/10"
                          : cn(
                              "cursor-pointer border-casino-slate/30 bg-casino-pearl hover:border-casino-gold hover:shadow-[0_0_12px_hsl(43_56%_52%/0.3)] hover:scale-105",
                              "active:scale-95"
                            )
                      )}
                    >
                      <span
                        className={cn(
                          "text-base sm:text-lg leading-none",
                          used
                            ? "text-casino-silver"
                            : isRed
                              ? "text-casino-ruby"
                              : "text-casino-deep"
                        )}
                      >
                        {rank}
                      </span>
                      <span
                        className={cn(
                          "text-xs sm:text-sm leading-none",
                          used
                            ? "text-casino-silver"
                            : isRed
                              ? "text-casino-ruby"
                              : "text-casino-deep"
                        )}
                      >
                        {SUIT_SYMBOLS[suit]}
                      </span>
                      {used && (
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] text-casino-silver font-sans bg-casino-deep/60 rounded-md">
                          In Use
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
