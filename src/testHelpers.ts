import type { Card } from "./types"

export function makeCard(overrides: Partial<Card> = {}): Card {
  const defaultCard: Card = {
    id: "1",
    deckId: "1",
    front: "What is the capital of France?",
    back: "Paris",
    createdAt: new Date("2026-07-28").toISOString(),
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    dueDate: new Date("2026-10-01").toISOString(),
  }
  return { ...defaultCard, ...overrides }
}
