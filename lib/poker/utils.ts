import type { Card, Rank } from "./types";
import { SUIT_SYMBOLS, RANK_VALUE } from "./constants";

export function cardId(card: Card): string {
  return `${card.rank}-${card.suit}`;
}

export function cardLabel(card: Card): string {
  return `${card.rank}${SUIT_SYMBOLS[card.suit]}`;
}

export function sortByRankDesc(cards: readonly Card[]): Card[] {
  return [...cards].sort((a, b) => RANK_VALUE[b.rank] - RANK_VALUE[a.rank]);
}

export function sortByRankAsc(cards: readonly Card[]): Card[] {
  return [...cards].sort((a, b) => RANK_VALUE[a.rank] - RANK_VALUE[b.rank]);
}

export function getCardValues(cards: readonly Card[]): number[] {
  return cards.map((c) => RANK_VALUE[c.rank]);
}

export function getCombinations(cards: readonly Card[], k: number): Card[][] {
  const results: Card[][] = [];

  function combine(start: number, combo: Card[]) {
    if (combo.length === k) {
      results.push([...combo]);
      return;
    }

    for (let i = start; i < cards.length; i++) {
      combo.push(cards[i]);
      combine(i + 1, combo);
      combo.pop();
    }
  }

  combine(0, []);
  return results;
}

export function compareTiebreakers(
  a: readonly number[],
  b: readonly number[],
): number {
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] !== b[i]) {
      return b[i] - a[i];
    }
  }
  return 0;
}
