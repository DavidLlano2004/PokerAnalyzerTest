import { describe, it, expect } from "@jest/globals"
import { determineWinner } from "@/lib/poker/comparator"
import type { Card } from "@/lib/poker/types"

describe("determineWinner", () => {
  describe("Basic Hand Rankings", () => {
    it("should determine winner when player1 has a higher hand rank", () => {
      // Player 1: Pair of Aces
      const p1Hole: Card[] = [
        { rank: "A", suit: "spades" },
        { rank: "A", suit: "hearts" },
      ]

      // Player 2: High Card King
      const p2Hole: Card[] = [
        { rank: "K", suit: "spades" },
        { rank: "Q", suit: "hearts" },
      ]

      const community: Card[] = [
        { rank: "2", suit: "diamonds" },
        { rank: "5", suit: "clubs" },
        { rank: "7", suit: "spades" },
        { rank: "9", suit: "hearts" },
        { rank: "J", suit: "diamonds" },
      ]

      const result = determineWinner(p1Hole, p2Hole, community)

      expect(result.winner).toBe("player1")
      expect(result.player1Hand.rank).toBe("One Pair")
      expect(result.player2Hand.rank).toBe("High Card")
    })

    it("should determine winner when player2 has a higher hand rank", () => {
      // Player 1: High Card Ace
      const p1Hole: Card[] = [
        { rank: "A", suit: "spades" },
        { rank: "K", suit: "hearts" },
      ]

      // Player 2: Three of a Kind
      const p2Hole: Card[] = [
        { rank: "7", suit: "hearts" },
        { rank: "7", suit: "clubs" },
      ]

      const community: Card[] = [
        { rank: "7", suit: "diamonds" },
        { rank: "2", suit: "clubs" },
        { rank: "3", suit: "spades" },
        { rank: "5", suit: "hearts" },
        { rank: "J", suit: "diamonds" },
      ]

      const result = determineWinner(p1Hole, p2Hole, community)

      expect(result.winner).toBe("player2")
      expect(result.player1Hand.rank).toBe("High Card")
      expect(result.player2Hand.rank).toBe("Three of a Kind")
    })
  })

  describe("Tiebreaker Scenarios - Same Hand Rank", () => {
    it("should handle two flushes with different high cards (edge case)", () => {
      // Player 1: Flush with Ace high
      const p1Hole: Card[] = [
        { rank: "A", suit: "hearts" },
        { rank: "K", suit: "hearts" },
      ]

      // Player 2: Flush with Queen high
      const p2Hole: Card[] = [
        { rank: "Q", suit: "hearts" },
        { rank: "J", suit: "hearts" },
      ]

      // Community has 3 hearts
      const community: Card[] = [
        { rank: "9", suit: "hearts" },
        { rank: "7", suit: "hearts" },
        { rank: "3", suit: "hearts" },
        { rank: "2", suit: "spades" },
        { rank: "5", suit: "clubs" },
      ]

      const result = determineWinner(p1Hole, p2Hole, community)

      expect(result.winner).toBe("player1")
      expect(result.player1Hand.rank).toBe("Flush")
      expect(result.player2Hand.rank).toBe("Flush")
      // Player 1 wins because A-K-9-7-3 beats Q-J-9-7-3
      expect(result.player1Hand.score).toBeGreaterThan(result.player2Hand.score)
    })

    it("should handle two pairs with same high pair but different kicker", () => {
      // Player 1: Pair of Kings with Ace kicker
      const p1Hole: Card[] = [
        { rank: "K", suit: "spades" },
        { rank: "A", suit: "hearts" },
      ]

      // Player 2: Pair of Kings with Queen kicker
      const p2Hole: Card[] = [
        { rank: "K", suit: "hearts" },
        { rank: "Q", suit: "diamonds" },
      ]

      const community: Card[] = [
        { rank: "K", suit: "diamonds" },
        { rank: "7", suit: "clubs" },
        { rank: "5", suit: "spades" },
        { rank: "3", suit: "hearts" },
        { rank: "2", suit: "diamonds" },
      ]

      const result = determineWinner(p1Hole, p2Hole, community)

      expect(result.winner).toBe("player1")
      expect(result.player1Hand.rank).toBe("One Pair")
      expect(result.player2Hand.rank).toBe("One Pair")
      // Player 1 wins on kicker (Ace vs Queen)
    })

    it("should handle two pairs vs two pairs with different high pair", () => {
      // Player 1: Two Pair (Aces and Kings)
      const p1Hole: Card[] = [
        { rank: "A", suit: "spades" },
        { rank: "K", suit: "hearts" },
      ]

      // Player 2: Two Pair (Queens and Jacks)
      const p2Hole: Card[] = [
        { rank: "Q", suit: "hearts" },
        { rank: "J", suit: "diamonds" },
      ]

      const community: Card[] = [
        { rank: "A", suit: "diamonds" },
        { rank: "K", suit: "clubs" },
        { rank: "Q", suit: "spades" },
        { rank: "J", suit: "hearts" },
        { rank: "2", suit: "diamonds" },
      ]

      const result = determineWinner(p1Hole, p2Hole, community)

      expect(result.winner).toBe("player1")
      expect(result.player1Hand.rank).toBe("Two Pair")
      expect(result.player2Hand.rank).toBe("Two Pair")
    })
  })

  describe("Special Cases", () => {
    it("should handle tie when both players have identical hands", () => {
      // Both players use only community cards
      const p1Hole: Card[] = [
        { rank: "2", suit: "spades" },
        { rank: "3", suit: "hearts" },
      ]

      const p2Hole: Card[] = [
        { rank: "4", suit: "diamonds" },
        { rank: "5", suit: "clubs" },
      ]

      // Community has Straight Flush
      const community: Card[] = [
        { rank: "A", suit: "hearts" },
        { rank: "K", suit: "hearts" },
        { rank: "Q", suit: "hearts" },
        { rank: "J", suit: "hearts" },
        { rank: "10", suit: "hearts" },
      ]

      const result = determineWinner(p1Hole, p2Hole, community)

      expect(result.winner).toBe("tie")
      expect(result.player1Hand.rank).toBe("Royal Flush")
      expect(result.player2Hand.rank).toBe("Royal Flush")
    })

    it("should handle the wheel straight (A-2-3-4-5)", () => {
      // Player 1: Wheel straight
      const p1Hole: Card[] = [
        { rank: "A", suit: "spades" },
        { rank: "2", suit: "hearts" },
      ]

      // Player 2: Pair of 5s
      const p2Hole: Card[] = [
        { rank: "5", suit: "hearts" },
        { rank: "5", suit: "diamonds" },
      ]

      const community: Card[] = [
        { rank: "3", suit: "clubs" },
        { rank: "4", suit: "diamonds" },
        { rank: "5", suit: "spades" },
        { rank: "K", suit: "hearts" },
        { rank: "Q", suit: "clubs" },
      ]

      const result = determineWinner(p1Hole, p2Hole, community)

      expect(result.winner).toBe("player1")
      expect(result.player1Hand.rank).toBe("Straight")
      expect(result.player2Hand.rank).toBe("Three of a Kind")
      // Straight beats three of a kind
    })

    it("should correctly evaluate full house vs flush", () => {
      // Player 1: Full House (Kings full of Jacks)
      const p1Hole: Card[] = [
        { rank: "K", suit: "spades" },
        { rank: "K", suit: "hearts" },
      ]

      // Player 2: Flush
      const p2Hole: Card[] = [
        { rank: "A", suit: "diamonds" },
        { rank: "9", suit: "diamonds" },
      ]

      const community: Card[] = [
        { rank: "K", suit: "diamonds" },
        { rank: "J", suit: "clubs" },
        { rank: "J", suit: "diamonds" },
        { rank: "8", suit: "diamonds" },
        { rank: "2", suit: "diamonds" },
      ]

      const result = determineWinner(p1Hole, p2Hole, community)

      expect(result.winner).toBe("player1")
      expect(result.player1Hand.rank).toBe("Full House")
      expect(result.player2Hand.rank).toBe("Flush")
      // Full House beats Flush
    })
  })

  describe("Incomplete Hands", () => {
    it("should handle when one player has no cards", () => {
      const p1Hole: Card[] = [
        { rank: "A", suit: "spades" },
        { rank: "K", suit: "hearts" },
      ]

      const p2Hole: Card[] = []

      const community: Card[] = [
        { rank: "2", suit: "diamonds" },
        { rank: "5", suit: "clubs" },
        { rank: "7", suit: "spades" },
      ]

      const result = determineWinner(p1Hole, p2Hole, community)

      // Player 1 should win by default
      expect(result.winner).toBe("player1")
    })

    it("should handle evaluation with less than 5 total cards", () => {
      const p1Hole: Card[] = [
        { rank: "A", suit: "spades" },
        { rank: "K", suit: "hearts" },
      ]

      const p2Hole: Card[] = [
        { rank: "Q", suit: "diamonds" },
        { rank: "J", suit: "clubs" },
      ]

      const community: Card[] = [] // No community cards yet

      const result = determineWinner(p1Hole, p2Hole, community)

      // Player 1 has higher cards (A-K vs Q-J)
      expect(result.winner).toBe("player1")
      expect(result.player1Hand.rank).toBe("High Card")
      expect(result.player2Hand.rank).toBe("High Card")
      expect(result.player1Hand.score).toBeGreaterThan(result.player2Hand.score)
    })
  })
})
