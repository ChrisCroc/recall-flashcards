import type { Card } from "./types"

export function dueCards(cards: Card[], today: Date): Card[] {
  return cards.filter((card) => new Date(card.dueDate).getTime() <= today.getTime())
}
