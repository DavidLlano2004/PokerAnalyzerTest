import type { Card, HandResult, WinnerResult } from "@/lib/poker/types";

export type SlotTarget =
  | { type: "player1"; index: number }
  | { type: "player2"; index: number }
  | { type: "community"; index: number };

export type PlayerType = 1 | 2;

export type CardSlot = Card | null;

export type PlayerCards = [CardSlot, CardSlot];

export type CommunityCards = [CardSlot, CardSlot, CardSlot, CardSlot, CardSlot];

export interface PokerState {
  // Card state
  player1Cards: PlayerCards;
  player2Cards: PlayerCards;
  communityCards: CommunityCards;

  // UI state
  selectorOpen: boolean;
  activeSlot: SlotTarget | null;
  showInfo: boolean;
}

export interface PokerActions {
  // Card management
  setPlayerCard: (player: PlayerType, index: number, card: CardSlot) => void;
  setCommunityCard: (index: number, card: CardSlot) => void;
  clearCard: (slot: SlotTarget) => void;
  selectCard: (card: Card) => void;
  resetAll: () => void;

  // UI management
  openSelector: (slot: SlotTarget) => void;
  closeSelector: () => void;
  toggleInfo: () => void;
}

export interface PokerSelectors {
  getUsedCards: () => Card[];
  getPlayer1Hand: () => HandResult | null;
  getPlayer2Hand: () => HandResult | null;
  getWinnerResult: () => WinnerResult | null;
  getWinningCardIds: () => Set<string>;
}

export type PokerStore = PokerState & PokerActions & PokerSelectors;
