import { useCallback } from 'react';
import { usePokerStore } from '@/store';
import type { Card } from '@/lib/poker';

// Get cards and set

export function usePlayerCards(player: 1 | 2) {
  const cards = usePokerStore(
    useCallback(
      (state) => (player === 1 ? state.player1Cards : state.player2Cards),
      [player]
    )
  );

  const setCard = usePokerStore((state) => state.setPlayerCard);

  const setPlayerCard = useCallback(
    (index: number, card: Card | null) => {
      setCard(player, index, card);
    },
    [player, setCard]
  );

  return { cards, setPlayerCard };
}