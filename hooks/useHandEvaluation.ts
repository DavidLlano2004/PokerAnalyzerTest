import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { usePokerStore } from "@/store";
import type { Card } from "@/lib/poker";
import { evaluateBestHand, determineWinner, cardId } from "@/lib/poker";

const filterValidCards = (cards: (Card | null)[]): Card[] =>
  cards.filter((c): c is Card => c !== null);

// Get usedCards
export function useUsedCards() {
  const { player1Cards, player2Cards, communityCards } = usePokerStore(
    useShallow((state) => ({
      player1Cards: state.player1Cards,
      player2Cards: state.player2Cards,
      communityCards: state.communityCards,
    })),
  );

  return useMemo(
    () => [
      ...filterValidCards(player1Cards),
      ...filterValidCards(player2Cards),
      ...filterValidCards(communityCards),
    ],
    [player1Cards, player2Cards, communityCards],
  );
}

// Evaluate a hand
export function usePlayerHand(player: 1 | 2) {
  const { playerCards, communityCards } = usePokerStore(
    useShallow((state) => ({
      playerCards: player === 1 ? state.player1Cards : state.player2Cards,
      communityCards: state.communityCards,
    })),
  );

  return useMemo(() => {
    const holeCards = filterValidCards(playerCards);
    const community = filterValidCards(communityCards);

    if (holeCards.length === 0) return null;

    return evaluateBestHand(holeCards, community);
  }, [playerCards, communityCards]);
}

// Choose winner
export function useWinnerResult() {
  const { player1Cards, player2Cards, communityCards } = usePokerStore(
    useShallow((state) => ({
      player1Cards: state.player1Cards,
      player2Cards: state.player2Cards,
      communityCards: state.communityCards,
    })),
  );

  return useMemo(() => {
    const p1Hole = filterValidCards(player1Cards);
    const p2Hole = filterValidCards(player2Cards);
    const community = filterValidCards(communityCards);

    if (p1Hole.length < 2 || p2Hole.length < 2) return null;

    return determineWinner(p1Hole, p2Hole, community);
  }, [player1Cards, player2Cards, communityCards]);
}

// Get winning cards id
export function useWinningCardIds() {
  const winnerResult = useWinnerResult();

  return useMemo(() => {
    const ids = new Set<string>();

    if (winnerResult && winnerResult.winner !== "tie") {
      const winHand =
        winnerResult.winner === "player1"
          ? winnerResult.player1Hand
          : winnerResult.player2Hand;

      for (const card of winHand.bestCards) {
        ids.add(cardId(card));
      }
    }

    return ids;
  }, [winnerResult]);
}
