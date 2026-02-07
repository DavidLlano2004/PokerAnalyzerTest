import type { PokerState } from './poker.types';

export const initialPokerState: PokerState = {
  player1Cards: [null, null],
  player2Cards: [null, null],
  communityCards: [null, null, null, null, null],
  selectorOpen: false,
  activeSlot: null,
  showInfo: false,
};