
import { useShallow } from 'zustand/react/shallow';
import { usePokerStore } from '@/store';

// Get and set comunity cards
export function useCommunityCards() {
  return usePokerStore(
    useShallow((state) => ({
      cards: state.communityCards,
      setCommunityCard: state.setCommunityCard,
    }))
  );
}