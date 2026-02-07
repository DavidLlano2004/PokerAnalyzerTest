import { useShallow } from 'zustand/react/shallow';
import { usePokerStore } from '@/store';

// Information panel
export function useInfoPanel() {
  return usePokerStore(
    useShallow((state) => ({
      showInfo: state.showInfo,
      toggleInfo: state.toggleInfo,
    }))
  );
}

// Get all cards
export function useAllCards() {
  return usePokerStore(
    useShallow((state) => ({
      player1Cards: state.player1Cards,
      player2Cards: state.player2Cards,
      communityCards: state.communityCards,
    }))
  );
}