

import type { PokerStore } from './poker.types';
import type { Card } from '@/lib/poker/types';
import { cardId, determineWinner, evaluateBestHand } from '@/lib/poker';

function filterValidCards(cards: (Card | null)[]): Card[] {
  return cards.filter((c): c is Card => c !== null);
}

export const createPokerSelectors = (
  get: () => PokerStore
) => ({
 
  getUsedCards: () => {
    const state = get();
    return [
      ...filterValidCards(state.player1Cards),
      ...filterValidCards(state.player2Cards),
      ...filterValidCards(state.communityCards),
    ];
  },

 
  getPlayer1Hand: () => {
    const state = get();
    const p1Hole = filterValidCards(state.player1Cards);
    const community = filterValidCards(state.communityCards);

    if (p1Hole.length === 0) return null;

    return evaluateBestHand(p1Hole, community);
  },

 
  getPlayer2Hand: () => {
    const state = get();
    const p2Hole = filterValidCards(state.player2Cards);
    const community = filterValidCards(state.communityCards);

    if (p2Hole.length === 0) return null;

    return evaluateBestHand(p2Hole, community);
  },

  
  getWinnerResult: () => {
    const state = get();
    const p1Hole = filterValidCards(state.player1Cards);
    const p2Hole = filterValidCards(state.player2Cards);
    const community = filterValidCards(state.communityCards);

    // Both players need at least 2 cards to determine a winner
    if (p1Hole.length < 2 || p2Hole.length < 2) return null;

    return determineWinner(p1Hole, p2Hole, community);
  },

  
  getWinningCardIds: () => {
    const winnerResult = get().getWinnerResult();
    const ids = new Set<string>();

    if (winnerResult && winnerResult.winner !== 'tie') {
      const winHand =
        winnerResult.winner === 'player1'
          ? winnerResult.player1Hand
          : winnerResult.player2Hand;

      for (const card of winHand.bestCards) {
        ids.add(cardId(card));
      }
    }

    return ids;
  },
});