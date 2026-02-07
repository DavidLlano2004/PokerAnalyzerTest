import { describe, it, expect } from "@jest/globals"
import { evaluateBestHand } from "@/lib/poker/evaluator"
import type { Card } from "@/lib/poker/types"

describe("evaluateBestHand", () => {
  describe("Royal Flush", () => {
    it("should correctly identify a royal flush", () => {
      const holeCards: Card[] = [
        { rank: "A", suit: "spades" },
        { rank: "K", suit: "spades" },
      ]

      const communityCards: Card[] = [
        { rank: "Q", suit: "spades" },
        { rank: "J", suit: "spades" },
        { rank: "10", suit: "spades" },
        { rank: "2", suit: "hearts" },
        { rank: "3", suit: "diamonds" },
      ]

      const result = evaluateBestHand(holeCards, communityCards)

      expect(result.rank).toBe("Royal Flush")
      expect(result.bestCards).toHaveLength(5)
      expect(result.description).toContain("Royal Flush")
    })
  })

  describe("Straight Flush", () => {
    it("should correctly identify a straight flush", () => {
      const holeCards: Card[] = [
        { rank: "9", suit: "hearts" },
        { rank: "8", suit: "hearts" },
      ]

      const communityCards: Card[] = [
        { rank: "7", suit: "hearts" },
        { rank: "6", suit: "hearts" },
        { rank: "5", suit: "hearts" },
        { rank: "A", suit: "spades" },
        { rank: "K", suit: "diamonds" },
      ]

      const result = evaluateBestHand(holeCards, communityCards)

      expect(result.rank).toBe("Straight Flush")
      expect(result.description).toContain("Straight Flush")
    })

    it("should handle wheel straight flush (A-2-3-4-5)", () => {
      const holeCards: Card[] = [
        { rank: "A", suit: "clubs" },
        { rank: "2", suit: "clubs" },
      ]

      const communityCards: Card[] = [
        { rank: "3", suit: "clubs" },
        { rank: "4", suit: "clubs" },
        { rank: "5", suit: "clubs" },
        { rank: "K", suit: "hearts" },
        { rank: "Q", suit: "diamonds" },
      ]

      const result = evaluateBestHand(holeCards, communityCards)

      expect(result.rank).toBe("Straight Flush")
    })
  })

  describe("Four of a Kind", () => {
    it("should correctly identify four of a kind", () => {
      const holeCards: Card[] = [
        { rank: "A", suit: "spades" },
        { rank: "A", suit: "hearts" },
      ]

      const communityCards: Card[] = [
        { rank: "A", suit: "diamonds" },
        { rank: "A", suit: "clubs" },
        { rank: "K", suit: "spades" },
        { rank: "2", suit: "hearts" },
        { rank: "3", suit: "diamonds" },
      ]

      const result = evaluateBestHand(holeCards, communityCards)

      expect(result.rank).toBe("Four of a Kind")
      expect(result.description).toContain("Four As")
    })
  })

  describe("Full House", () => {
    it("should correctly identify a full house", () => {
      const holeCards: Card[] = [
        { rank: "Q", suit: "spades" },
        { rank: "Q", suit: "hearts" },
      ]

      const communityCards: Card[] = [
        { rank: "Q", suit: "diamonds" },
        { rank: "7", suit: "clubs" },
        { rank: "7", suit: "spades" },
        { rank: "2", suit: "hearts" },
        { rank: "3", suit: "diamonds" },
      ]

      const result = evaluateBestHand(holeCards, communityCards)

      expect(result.rank).toBe("Full House")
      expect(result.description).toContain("Full House")
      expect(result.description).toContain("Qs")
      expect(result.description).toContain("7s")
    })

    it("should choose the best full house from multiple options", () => {
      const holeCards: Card[] = [
        { rank: "A", suit: "spades" },
        { rank: "A", suit: "hearts" },
      ]

      const communityCards: Card[] = [
        { rank: "A", suit: "diamonds" },
        { rank: "K", suit: "clubs" },
        { rank: "K", suit: "spades" },
        { rank: "7", suit: "hearts" },
        { rank: "7", suit: "diamonds" },
      ]

      const result = evaluateBestHand(holeCards, communityCards)

      expect(result.rank).toBe("Full House")
      // Should be Aces full of Kings (not Aces full of 7s)
      expect(result.description).toContain("As")
      expect(result.description).toContain("Ks")
    })
  })

  describe("Flush", () => {
    it("should correctly identify a flush", () => {
      const holeCards: Card[] = [
        { rank: "A", suit: "diamonds" },
        { rank: "K", suit: "diamonds" },
      ]

      const communityCards: Card[] = [
        { rank: "9", suit: "diamonds" },
        { rank: "5", suit: "diamonds" },
        { rank: "2", suit: "diamonds" },
        { rank: "7", suit: "hearts" },
        { rank: "3", suit: "clubs" },
      ]

      const result = evaluateBestHand(holeCards, communityCards)

      expect(result.rank).toBe("Flush")
      expect(result.description).toContain("Flush")
    })

    it("should choose the highest 5 cards for flush", () => {
      const holeCards: Card[] = [
        { rank: "A", suit: "hearts" },
        { rank: "K", suit: "hearts" },
      ]

      const communityCards: Card[] = [
        { rank: "Q", suit: "hearts" },
        { rank: "J", suit: "hearts" },
        { rank: "9", suit: "hearts" },
        { rank: "7", suit: "hearts" },
        { rank: "2", suit: "clubs" },
      ]

      const result = evaluateBestHand(holeCards, communityCards)

      expect(result.rank).toBe("Flush")
      // Should use A-K-Q-J-9, not the 7
      const bestRanks = result.bestCards.map((c) => c.rank)
      expect(bestRanks).toContain("A")
      expect(bestRanks).toContain("K")
      expect(bestRanks).toContain("Q")
      expect(bestRanks).toContain("J")
      expect(bestRanks).toContain("9")
      expect(bestRanks).not.toContain("7")
    })
  })

  describe("Straight", () => {
    it("should correctly identify a straight", () => {
      const holeCards: Card[] = [
        { rank: "9", suit: "spades" },
        { rank: "8", suit: "hearts" },
      ]

      const communityCards: Card[] = [
        { rank: "7", suit: "diamonds" },
        { rank: "6", suit: "clubs" },
        { rank: "5", suit: "spades" },
        { rank: "A", suit: "hearts" },
        { rank: "K", suit: "diamonds" },
      ]

      const result = evaluateBestHand(holeCards, communityCards)

      expect(result.rank).toBe("Straight")
      expect(result.description).toContain("Straight")
    })

    it("should handle wheel straight (A-2-3-4-5) correctly", () => {
      const holeCards: Card[] = [
        { rank: "A", suit: "spades" },
        { rank: "2", suit: "hearts" },
      ]

      const communityCards: Card[] = [
        { rank: "3", suit: "diamonds" },
        { rank: "4", suit: "clubs" },
        { rank: "5", suit: "spades" },
        { rank: "K", suit: "hearts" },
        { rank: "Q", suit: "diamonds" },
      ]

      const result = evaluateBestHand(holeCards, communityCards)

      expect(result.rank).toBe("Straight")
      expect(result.description).toContain("Wheel")
    })
  })

  describe("Three of a Kind", () => {
    it("should correctly identify three of a kind", () => {
      const holeCards: Card[] = [
        { rank: "J", suit: "spades" },
        { rank: "J", suit: "hearts" },
      ]

      const communityCards: Card[] = [
        { rank: "J", suit: "diamonds" },
        { rank: "A", suit: "clubs" },
        { rank: "K", suit: "spades" },
        { rank: "2", suit: "hearts" },
        { rank: "3", suit: "diamonds" },
      ]

      const result = evaluateBestHand(holeCards, communityCards)

      expect(result.rank).toBe("Three of a Kind")
      expect(result.description).toContain("Three Js")
    })
  })

  describe("Two Pair", () => {
    it("should correctly identify two pair", () => {
      const holeCards: Card[] = [
        { rank: "A", suit: "spades" },
        { rank: "A", suit: "hearts" },
      ]

      const communityCards: Card[] = [
        { rank: "K", suit: "diamonds" },
        { rank: "K", suit: "clubs" },
        { rank: "Q", suit: "spades" },
        { rank: "2", suit: "hearts" },
        { rank: "3", suit: "diamonds" },
      ]

      const result = evaluateBestHand(holeCards, communityCards)

      expect(result.rank).toBe("Two Pair")
      expect(result.description).toContain("Two Pair")
    })
  })

  describe("One Pair", () => {
    it("should correctly identify one pair", () => {
      const holeCards: Card[] = [
        { rank: "10", suit: "spades" },
        { rank: "10", suit: "hearts" },
      ]

      const communityCards: Card[] = [
        { rank: "A", suit: "diamonds" },
        { rank: "K", suit: "clubs" },
        { rank: "Q", suit: "spades" },
        { rank: "2", suit: "hearts" },
        { rank: "3", suit: "diamonds" },
      ]

      const result = evaluateBestHand(holeCards, communityCards)

      expect(result.rank).toBe("One Pair")
      expect(result.description).toContain("Pair of 10s")
    })
  })

  describe("High Card", () => {
    it("should correctly identify high card", () => {
      const holeCards: Card[] = [
        { rank: "A", suit: "spades" },
        { rank: "K", suit: "hearts" },
      ]

      const communityCards: Card[] = [
        { rank: "Q", suit: "diamonds" },
        { rank: "J", suit: "clubs" },
        { rank: "9", suit: "spades" },
        { rank: "2", suit: "hearts" },
        { rank: "3", suit: "diamonds" },
      ]

      const result = evaluateBestHand(holeCards, communityCards)

      expect(result.rank).toBe("High Card")
      expect(result.description).toContain("High Card")
    })
  })

  describe("Edge Cases", () => {
    it("should handle empty hands", () => {
      const result = evaluateBestHand([], [])

      expect(result.rank).toBe("High Card")
      expect(result.score).toBe(0)
      expect(result.bestCards).toHaveLength(0)
      expect(result.description).toBe("No cards selected")
    })

    it("should handle less than 5 cards total", () => {
      const holeCards: Card[] = [
        { rank: "A", suit: "spades" },
        { rank: "K", suit: "hearts" },
      ]

      const communityCards: Card[] = [
        { rank: "Q", suit: "diamonds" },
      ]

      const result = evaluateBestHand(holeCards, communityCards)

      expect(result.rank).toBe("High Card")
      expect(result.bestCards).toHaveLength(3)
    })

    it("should correctly score hands for comparison", () => {
      const royalFlush = evaluateBestHand(
        [
          { rank: "A", suit: "spades" },
          { rank: "K", suit: "spades" },
        ],
        [
          { rank: "Q", suit: "spades" },
          { rank: "J", suit: "spades" },
          { rank: "10", suit: "spades" },
          { rank: "2", suit: "hearts" },
          { rank: "3", suit: "diamonds" },
        ]
      )

      const highCard = evaluateBestHand(
        [
          { rank: "A", suit: "hearts" },
          { rank: "K", suit: "diamonds" },
        ],
        [
          { rank: "Q", suit: "clubs" },
          { rank: "J", suit: "hearts" },
          { rank: "9", suit: "spades" },
          { rank: "2", suit: "hearts" },
          { rank: "3", suit: "diamonds" },
        ]
      )

      expect(royalFlush.score).toBeGreaterThan(highCard.score)
    })
  })
})
