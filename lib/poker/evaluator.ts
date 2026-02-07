import type { Card, HandRank, HandResult } from "./types";
import { HAND_RANK_SCORE, RANK_VALUE, SUIT_SYMBOLS } from "./constants";
import { sortByRankDesc, getCombinations, getCardValues } from "./utils";

interface EvaluationResult {
  rank: HandRank;
  tiebreaker: number[];
}

// Evaluates 5 cards

function evaluateFiveCards(cards: readonly Card[]): EvaluationResult {
  const sorted = sortByRankDesc(cards);
  const values = getCardValues(sorted);
  const suits = sorted.map((c) => c.suit);

  const isFlush = suits.every((s) => s === suits[0]);

  let isStraight = false;
  let straightHigh = 0;

  const uniqueValues = [...new Set(values)].sort((a, b) => b - a);

  if (uniqueValues.length === 5) {
    if (uniqueValues[0] - uniqueValues[4] === 4) {
      isStraight = true;
      straightHigh = uniqueValues[0];
    }

    if (
      uniqueValues[0] === 14 &&
      uniqueValues[1] === 5 &&
      uniqueValues[2] === 4 &&
      uniqueValues[3] === 3 &&
      uniqueValues[4] === 2
    ) {
      isStraight = true;
      straightHigh = 5;
    }
  }

  const counts: Record<number, number> = {};
  for (const v of values) {
    counts[v] = (counts[v] || 0) + 1;
  }

  const countEntries = Object.entries(counts)
    .map(([v, c]) => ({ value: Number(v), count: c }))
    .sort((a, b) => b.count - a.count || b.value - a.value);

  // Royal Flush: A-K-Q-J-10 all same suit
  if (isFlush && isStraight && straightHigh === 14) {
    return { rank: "Royal Flush", tiebreaker: [14] };
  }

  // Straight Flush: Five sequential cards, all same suit
  if (isFlush && isStraight) {
    return { rank: "Straight Flush", tiebreaker: [straightHigh] };
  }

  // Four of a Kind: Four cards of same rank
  if (countEntries[0].count === 4) {
    return {
      rank: "Four of a Kind",
      tiebreaker: [countEntries[0].value, countEntries[1].value],
    };
  }

  // Full House: Three of a kind + pair
  if (countEntries[0].count === 3 && countEntries[1].count === 2) {
    return {
      rank: "Full House",
      tiebreaker: [countEntries[0].value, countEntries[1].value],
    };
  }

  // Flush: All cards same suit (but not straight)
  if (isFlush) {
    return { rank: "Flush", tiebreaker: values };
  }

  // Straight: Five sequential cards (but not same suit)
  if (isStraight) {
    return { rank: "Straight", tiebreaker: [straightHigh] };
  }

  // Three of a Kind: Three cards of same rank
  if (countEntries[0].count === 3) {
    const kickers = countEntries
      .filter((e) => e.count === 1)
      .map((e) => e.value)
      .sort((a, b) => b - a);
    return {
      rank: "Three of a Kind",
      tiebreaker: [countEntries[0].value, ...kickers],
    };
  }

  // Two Pair: Two different pairs
  if (countEntries[0].count === 2 && countEntries[1].count === 2) {
    const pairs = [countEntries[0].value, countEntries[1].value].sort(
      (a, b) => b - a,
    );
    const kicker = countEntries.find((e) => e.count === 1)!.value;
    return { rank: "Two Pair", tiebreaker: [...pairs, kicker] };
  }

  // One Pair: Two cards of same rank
  if (countEntries[0].count === 2) {
    const kickers = countEntries
      .filter((e) => e.count === 1)
      .map((e) => e.value)
      .sort((a, b) => b - a);
    return {
      rank: "One Pair",
      tiebreaker: [countEntries[0].value, ...kickers],
    };
  }

  // High Card: No matching ranks
  return { rank: "High Card", tiebreaker: values };
}

// Generates description of the hand

function getHandDescription(rank: HandRank, cards: readonly Card[]): string {
  if (cards.length === 0) return "No cards";

  switch (rank) {
    case "Royal Flush":
      return `Royal Flush (${SUIT_SYMBOLS[cards[0].suit]})`;

    case "Straight Flush":
      return `Straight Flush, ${cards[0].rank} high`;

    case "Four of a Kind": {
      return `Four ${cards[0].rank}s`;
    }

    case "Full House": {
      const trips = cards.find(
        (c) => cards.filter((x) => x.rank === c.rank).length === 3,
      );
      const pair = cards.find(
        (c) => cards.filter((x) => x.rank === c.rank).length === 2,
      );
      return `Full House, ${trips?.rank}s full of ${pair?.rank}s`;
    }

    case "Flush":
      return `Flush, ${cards[0].rank} high`;

    case "Straight": {
      const values = cards.map((c) => RANK_VALUE[c.rank]);
      if (values.includes(14) && values.includes(5)) {
        return `Straight, 5 high (Wheel)`;
      }
      return `Straight, ${cards[0].rank} high`;
    }

    case "Three of a Kind": {
      const trip = cards.find(
        (c) => cards.filter((x) => x.rank === c.rank).length === 3,
      );
      return `Three ${trip?.rank}s`;
    }

    case "Two Pair": {
      const pairs = [
        ...new Set(
          cards
            .filter((c) => cards.filter((x) => x.rank === c.rank).length === 2)
            .map((c) => c.rank),
        ),
      ];
      return `Two Pair, ${pairs[0]}s and ${pairs[1]}s`;
    }

    case "One Pair": {
      const pair = cards.find(
        (c) => cards.filter((x) => x.rank === c.rank).length === 2,
      );
      return `Pair of ${pair?.rank}s`;
    }

    case "High Card":
      return `High Card: ${cards[0].rank}`;
  }
}

// Evaluates the best 5-card hand from hole cards and community cards

export function evaluateBestHand(
  holeCards: readonly Card[],
  communityCards: readonly Card[],
): HandResult {
  const allCards = [...holeCards, ...communityCards];

  if (allCards.length < 5) {
    if (allCards.length === 0) {
      return {
        rank: "High Card",
        score: 0,
        bestCards: [],
        description: "No cards selected",
      };
    }

    const sorted = sortByRankDesc(allCards);
    const values = getCardValues(sorted);

    const score = values.reduce(
      (acc, v, i) => acc + v * Math.pow(15, 4 - i),
      0,
    );

    return {
      rank: "High Card",
      score,
      bestCards: sorted,
      description: `High Card: ${sorted[0].rank}`,
    };
  }

  const combinations = getCombinations(allCards, 5);

  let bestResult: EvaluationResult | null = null;
  let bestCombo: Card[] = [];

  for (const combo of combinations) {
    const result = evaluateFiveCards(combo);

    if (!bestResult) {
      bestResult = result;
      bestCombo = combo;
      continue;
    }

    const scoreDiff =
      HAND_RANK_SCORE[result.rank] - HAND_RANK_SCORE[bestResult.rank];

    if (scoreDiff > 0) {
      bestResult = result;
      bestCombo = combo;
    } else if (scoreDiff === 0) {
      const tiebreakerComparison = compareTiebreakers(
        result.tiebreaker,
        bestResult.tiebreaker,
      );
      if (tiebreakerComparison < 0) {
        bestResult = result;
        bestCombo = combo;
      }
    }
  }

  // Calculate final score

  const rank = bestResult!.rank;
  const score =
    HAND_RANK_SCORE[rank] * 1000000 +
    bestResult!.tiebreaker.reduce(
      (acc, v, i) => acc + v * Math.pow(15, 4 - i),
      0,
    );

  return {
    rank,
    score,
    bestCards: sortByRankDesc(bestCombo),
    description: getHandDescription(rank, sortByRankDesc(bestCombo)),
  };
}

// Compares two tiebreaker arrays

function compareTiebreakers(
  a: readonly number[],
  b: readonly number[],
): number {
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] !== b[i]) {
      return b[i] - a[i];
    }
  }
  return 0;
}
