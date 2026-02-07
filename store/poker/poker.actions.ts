import type {
  PokerStore,
  SlotTarget,
  PlayerType,
  CardSlot,
} from "./poker.types";
import type { Card } from "@/lib/poker/types";
import { initialPokerState } from "./poker.initial-state";

export const createPokerActions = (
  set: (
    partial: Partial<PokerStore> | ((state: PokerStore) => Partial<PokerStore>),
    replace?: boolean,
    actionName?: string,
  ) => void,
  get: () => PokerStore,
) => ({
  // Set a card for a specific player

  setPlayerCard: (player: PlayerType, index: number, card: CardSlot) =>
    set(
      (state) => {
        const key = player === 1 ? "player1Cards" : "player2Cards";
        const newCards = [...state[key]] as (typeof state)[typeof key];
        newCards[index] = card;
        return { [key]: newCards };
      },
      false,
      `setPlayer${player}Card`,
    ),

  //Set a community card

  setCommunityCard: (index: number, card: CardSlot) =>
    set(
      (state) => {
        const newCards = [
          ...state.communityCards,
        ] as typeof state.communityCards;
        newCards[index] = card;
        return { communityCards: newCards };
      },
      false,
      "setCommunityCard",
    ),

  // Clear a card from any slot

  clearCard: (slot: SlotTarget) =>
    set(
      (state) => {
        switch (slot.type) {
          case "player1": {
            const newCards = [
              ...state.player1Cards,
            ] as typeof state.player1Cards;
            newCards[slot.index] = null;
            return { player1Cards: newCards };
          }
          case "player2": {
            const newCards = [
              ...state.player2Cards,
            ] as typeof state.player2Cards;
            newCards[slot.index] = null;
            return { player2Cards: newCards };
          }
          case "community": {
            const newCards = [
              ...state.communityCards,
            ] as typeof state.communityCards;
            newCards[slot.index] = null;
            return { communityCards: newCards };
          }
        }
      },
      false,
      "clearCard",
    ),

  //Select a card for the currently active slot

  selectCard: (card: Card) =>
    set(
      (state) => {
        const { activeSlot } = state;
        if (!activeSlot) return state;

        switch (activeSlot.type) {
          case "player1": {
            const newCards = [
              ...state.player1Cards,
            ] as typeof state.player1Cards;
            newCards[activeSlot.index] = card;
            return {
              player1Cards: newCards,
              selectorOpen: false,
              activeSlot: null,
            };
          }
          case "player2": {
            const newCards = [
              ...state.player2Cards,
            ] as typeof state.player2Cards;
            newCards[activeSlot.index] = card;
            return {
              player2Cards: newCards,
              selectorOpen: false,
              activeSlot: null,
            };
          }
          case "community": {
            const newCards = [
              ...state.communityCards,
            ] as typeof state.communityCards;
            newCards[activeSlot.index] = card;
            return {
              communityCards: newCards,
              selectorOpen: false,
              activeSlot: null,
            };
          }
        }
      },
      false,
      "selectCard",
    ),

  
  resetAll: () =>
    set(
      {
        ...initialPokerState,
        showInfo: get().showInfo,
      },
      false,
      "resetAll",
    ),

 
  openSelector: (slot: SlotTarget) =>
    set(
      {
        selectorOpen: true,
        activeSlot: slot,
      },
      false,
      "openSelector",
    ),

  
  closeSelector: () =>
    set(
      {
        selectorOpen: false,
        activeSlot: null,
      },
      false,
      "closeSelector",
    ),


  toggleInfo: () =>
    set((state) => ({ showInfo: !state.showInfo }), false, "toggleInfo"),
});
