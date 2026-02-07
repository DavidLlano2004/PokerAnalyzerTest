import type { Card, WinnerResult, Player } from "./types";
import { evaluateBestHand } from "./evaluator";

//Determines the winner between two players

export function determineWinner(
  p1Hole: readonly Card[],
  p2Hole: readonly Card[],
  community: readonly Card[],
): WinnerResult {
  const p1Hand = evaluateBestHand(p1Hole, community);
  const p2Hand = evaluateBestHand(p2Hole, community);

  // Higher score always wins
  let winner: Player | "tie";

  if (p1Hand.score > p2Hand.score) {
    winner = "player1";
  } else if (p2Hand.score > p1Hand.score) {
    winner = "player2";
  } else {
    winner = "tie";
  }

  return {
    winner,
    player1Hand: p1Hand,
    player2Hand: p2Hand,
  };
}

// Player has a valid hand

export function hasValidHand(cards: readonly (Card | null)[]): boolean {
  return cards.some((card) => card !== null);
}

// Filters valid cards

export function filterValidCards(cards: readonly (Card | null)[]): Card[] {
  return cards.filter((c): c is Card => c !== null);
}
