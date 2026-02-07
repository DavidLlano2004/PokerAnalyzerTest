import type { Card } from "./types";
import { SUITS, RANKS } from "./constants";

export function createDeck(): Card[] {
  const deck: Card[] = [];

  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit });
    }
  }

  return deck;
}

export function isCardInArray(card: Card, cards: readonly Card[]): boolean {
  return cards.some((c) => c.rank === card.rank && c.suit === card.suit);
}

export function getAvailableCards(usedCards: readonly Card[]): Card[] {
  const fullDeck = createDeck();
  return fullDeck.filter((card) => !isCardInArray(card, usedCards));
}
