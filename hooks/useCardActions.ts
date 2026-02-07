
import { useCallback } from 'react';
import { usePokerStore, type SlotTarget } from '@/store';

// Card actions
export function useCardActions() {
  const clearCard = usePokerStore((state) => state.clearCard);
  const resetAll = usePokerStore((state) => state.resetAll);
  const openSelector = usePokerStore((state) => state.openSelector);
  const closeSelector = usePokerStore((state) => state.closeSelector);

  return {
    clearCard: useCallback((slot: SlotTarget) => clearCard(slot), [clearCard]),
    resetAll: useCallback(() => resetAll(), [resetAll]),
    openSelector: useCallback(
      (slot: SlotTarget) => openSelector(slot),
      [openSelector]
    ),
    closeSelector: useCallback(() => closeSelector(), [closeSelector]),
  };
}