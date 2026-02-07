import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { PokerStore } from './poker.types';
import { initialPokerState } from './poker.initial-state';
import { createPokerActions } from './poker.actions';
import { createPokerSelectors } from './poker.selectors';

export const usePokerStore = create<PokerStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      ...initialPokerState,

      // Actions
      ...createPokerActions(set, get),

      // Selectors
      ...createPokerSelectors(get),
    }),
    {
      name: 'poker-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);

// Export store type for TypeScript
export type { PokerStore } from './poker.types';