"use client"

import { cn } from "@/lib/utils"
import type { Card } from "@/lib/poker"
import { SUIT_SYMBOLS } from "@/lib/poker"

interface PlayingCardProps {
  card?: Card | null
  onClick?: () => void
  isHighlighted?: boolean
  isDisabled?: boolean
  isEmpty?: boolean
  label?: string
  size?: "sm" | "md" | "lg"
}

export function PlayingCard({
  card,
  onClick,
  isHighlighted = false,
  isDisabled = false,
  isEmpty = false,
  label,
  size = "md",
}: PlayingCardProps) {
  const isRed =
    card?.suit === "hearts" || card?.suit === "diamonds"

  const sizeClasses = {
    sm: "w-[60px] h-[84px]",
    md: "w-[90px] h-[126px]",
    lg: "w-[100px] h-[140px]",
  }

  const rankSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  }

  const suitCenterClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-5xl",
  }

  if (isEmpty || !card) {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={isDisabled}
        className={cn(
          sizeClasses[size],
          "relative rounded-lg border-2 border-dashed border-casino-slate/50 flex items-center justify-center",
          "transition-all duration-200 cursor-pointer",
          "bg-casino-mid/50 hover:border-casino-gold/50 hover:bg-casino-mid",
          "animate-pulse-border",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-casino-gold",
          isDisabled && "opacity-40 cursor-not-allowed hover:border-casino-slate/50"
        )}
      >
        <span className="text-xs text-casino-silver font-sans text-center px-1">
          {label || "Select"}
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        sizeClasses[size],
        "relative rounded-lg border-2 flex flex-col items-center justify-between p-1.5",
        "transition-all duration-200 select-none",
        "bg-casino-pearl shadow-md",
        isHighlighted
          ? "animate-card-glow border-casino-gold"
          : "border-casino-slate/30 shadow-[0_4px_8px_rgba(0,0,0,0.3)]",
        onClick && !isDisabled && "cursor-pointer hover:-translate-y-1 hover:shadow-lg",
        isDisabled && "opacity-40 cursor-not-allowed",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-casino-gold"
      )}
    >
      <div className="self-start flex flex-col items-center leading-none">
        <span
          className={cn(
            rankSizeClasses[size],
            "font-serif font-bold leading-none",
            isRed ? "text-casino-ruby" : "text-casino-deep"
          )}
        >
          {card.rank}
        </span>
        <span
          className={cn(
            size === "sm" ? "text-sm" : "text-base",
            "leading-none",
            isRed ? "text-casino-ruby" : "text-casino-deep"
          )}
        >
          {SUIT_SYMBOLS[card.suit]}
        </span>
      </div>

      <span
        className={cn(
          suitCenterClasses[size],
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          isRed ? "text-casino-ruby/80" : "text-casino-deep/60"
        )}
      >
        {SUIT_SYMBOLS[card.suit]}
      </span>

      <div className="self-end flex flex-col items-center leading-none rotate-180">
        <span
          className={cn(
            rankSizeClasses[size],
            "font-serif font-bold leading-none",
            isRed ? "text-casino-ruby" : "text-casino-deep"
          )}
        >
          {card.rank}
        </span>
        <span
          className={cn(
            size === "sm" ? "text-sm" : "text-base",
            "leading-none",
            isRed ? "text-casino-ruby" : "text-casino-deep"
          )}
        >
          {SUIT_SYMBOLS[card.suit]}
        </span>
      </div>
    </button>
  )
}
