import { useShallow } from 'zustand/react/shallow';
import { usePokerStore } from '@/store';

// Card modal status
export function useCardSelector() {
  return usePokerStore(
    useShallow((state) => ({
      isOpen: state.selectorOpen,
      activeSlot: state.activeSlot,
      openSelector: state.openSelector,
      closeSelector: state.closeSelector,
    }))
  );
}