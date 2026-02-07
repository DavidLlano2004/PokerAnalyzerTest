
export type Suit = "spades" | "hearts" | "diamonds" | "clubs"


export type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A"


export interface Card {
  readonly rank: Rank
  readonly suit: Suit
}


export type HandRank =
  | "High Card"
  | "One Pair"
  | "Two Pair"
  | "Three of a Kind"
  | "Straight"
  | "Flush"
  | "Full House"
  | "Four of a Kind"
  | "Straight Flush"
  | "Royal Flush"


export interface HandResult {
  readonly rank: HandRank
  readonly score: number
  readonly bestCards: Card[]
  readonly description: string
}


export interface WinnerResult {
  readonly winner: "player1" | "player2" | "tie"
  readonly player1Hand: HandResult
  readonly player2Hand: HandResult
}


export type Player = "player1" | "player2"


export type SlotTarget =
  | { type: "player1"; index: number }
  | { type: "player2"; index: number }
  | { type: "community"; index: number }
