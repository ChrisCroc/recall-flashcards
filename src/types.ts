export interface Card {
  id: string
  deckId: string
  front: string
  back: string
  createdAt: string
  easeFactor: number
  interval: number
  repetitions: number
  dueDate: string
}

export interface Deck {
  id: string
  name: string
  description?: string
  origin: "starter" | "user"
  createdAt: string
}

export interface AppData {
  version: number
  decks: Deck[]
  cards: Card[]
}

export type Grade = 1 | 3 | 4 | 5

export type Screen =
  | { name: "decks" }
  | { name: "review"; deckId: string | "all" }
  | { name: "editor"; deckId: string }

export type Action =
  | { type: "delete_deck"; id: string }
