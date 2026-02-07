"use client"

import { cn } from "@/lib/utils"
import type { HandRank } from "@/lib/poker"

const RANKINGS: { rank: HandRank; example: string; description: string }[] = [
  {
    rank: "Royal Flush",
    example: "A K Q J 10",
    description: "Same suit, A through 10",
  },
  {
    rank: "Straight Flush",
    example: "9 8 7 6 5",
    description: "Same suit, sequential",
  },
  {
    rank: "Four of a Kind",
    example: "K K K K 3",
    description: "Four cards of same rank",
  },
  {
    rank: "Full House",
    example: "J J J 8 8",
    description: "Three of a kind + pair",
  },
  {
    rank: "Flush",
    example: "A J 8 4 2",
    description: "All same suit",
  },
  {
    rank: "Straight",
    example: "10 9 8 7 6",
    description: "Five sequential cards",
  },
  {
    rank: "Three of a Kind",
    example: "7 7 7 K 3",
    description: "Three cards of same rank",
  },
  {
    rank: "Two Pair",
    example: "Q Q 5 5 A",
    description: "Two different pairs",
  },
  {
    rank: "One Pair",
    example: "10 10 K 4 2",
    description: "Two cards of same rank",
  },
  {
    rank: "High Card",
    example: "A K J 8 3",
    description: "Highest card plays",
  },
]

interface HandRankingsProps {
  currentP1Rank?: HandRank | null
  currentP2Rank?: HandRank | null
}

export function HandRankings({
  currentP1Rank,
  currentP2Rank,
}: HandRankingsProps) {
  return (
    <div className="rounded-xl border border-casino-slate/30 bg-casino-mid/50 p-6">
      <h3 className="text-sm font-display tracking-[0.2em] uppercase text-casino-gold mb-4">
        Hand Rankings
      </h3>
      <div className="flex flex-col gap-1.5">
        {RANKINGS.map((item, i) => {
          const isP1 = currentP1Rank === item.rank
          const isP2 = currentP2Rank === item.rank
          return (
            <div
              key={item.rank}
              className={cn(
                "flex items-center gap-3 px-3 py-1.5 rounded-md text-sm font-sans transition-colors",
                isP1 || isP2
                  ? "bg-casino-gold/10 border border-casino-gold/20"
                  : "border border-transparent"
              )}
            >
              <span className="text-casino-silver w-4 text-xs text-right">
                {i + 1}
              </span>
              <span
                className={cn(
                  "font-medium flex-1",
                  isP1 || isP2 ? "text-casino-gold" : "text-casino-pearl"
                )}
              >
                {item.rank}
              </span>
              <span className="text-casino-silver text-xs hidden sm:block">
                {item.description}
              </span>
              {isP1 && (
                <span className="text-[10px] font-semibold text-casino-emerald px-1.5 py-0.5 rounded bg-casino-emerald/10">
                  P1
                </span>
              )}
              {isP2 && (
                <span className="text-[10px] font-semibold text-casino-ruby px-1.5 py-0.5 rounded bg-casino-ruby/10">
                  P2
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
