
import type { Suit, Rank, HandRank } from "./types"


export const SUITS: readonly Suit[] = ["spades", "hearts", "diamonds", "clubs"]


export const RANKS: readonly Rank[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
]

// SYMBOLS CARDS
export const SUIT_SYMBOLS: Record<Suit, string> = {
  spades: "\u2660",
  hearts: "\u2665",
  diamonds: "\u2666",
  clubs: "\u2663",
} as const


export const SUIT_COLORS: Record<Suit, string> = {
  spades: "text-casino-slate",
  hearts: "text-casino-ruby",
  diamonds: "text-casino-ruby",
  clubs: "text-casino-slate",
} as const


export const RANK_VALUE: Record<Rank, number> = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
} as const


export const HAND_RANK_SCORE: Record<HandRank, number> = {
  "High Card": 0,
  "One Pair": 1,
  "Two Pair": 2,
  "Three of a Kind": 3,
  Straight: 4,
  Flush: 5,
  "Full House": 6,
  "Four of a Kind": 7,
  "Straight Flush": 8,
  "Royal Flush": 9,
} as const


export const MAX_COMMUNITY_CARDS = 5
export const MAX_HOLE_CARDS = 2


export const DECK_SIZE = 52
