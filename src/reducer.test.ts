import { test, expect } from "vitest"
import { makeCard, makeDeck } from "./testHelpers"
import type { AppData, Grade } from "./types"
import { reducer } from "./reducer"
import { schedule } from "./sm2"

test("grade_card applies schedule to the targeted card and replaces it", () => {
  const card = makeCard()
  const cardState: AppData = { version: 1, decks: [], cards: [card] }
  const grade: Grade = 4 // Good
  const today = new Date("2026-09-01")

  const result: AppData = reducer(cardState, { type: "grade_card", id: card.id , grade: grade, today: today })
  const updatedCard = result.cards[0]

  expect(updatedCard).toEqual(schedule(card, grade, today))
})

test("delete_deck filters the decks and delete the right one and delete the cards within it", () => {
  const deck = makeDeck({ id: "deck1" })
  const deck2 = makeDeck({ id: "deck2" })
  const card = makeCard({ deckId: deck.id })
  const card2 = makeCard({ id: "3", deckId: deck2.id })
  const deckState: AppData = { version: 1, decks: [deck, deck2], cards: [card, card2] }

  const result: AppData = reducer(deckState, { type: "delete_deck", id: deck.id })

  expect(result).toEqual({ version: 1, decks: [deck2], cards: [card2] })
})

test("add_deck adds a new deck to Decks[] with a new id and a new name", () => {
  const deck = makeDeck({ id: "deck1", name: "deck original" })
  const newDeck = makeDeck({ id: "fresh", name: "new Deck" })
  const deckState: AppData = { version: 1, decks: [deck], cards: [] }

  const result: AppData = reducer(deckState, { type: "add_deck", deck: newDeck })

  expect(result).toEqual({ version: 1, decks: [deck, newDeck], cards: [] })
})

test("rename_deck rewrites only the name of the selected deck", () => {
  const deck1 = makeDeck({ id: "1", name: "deck1" })
  const deck2 = makeDeck({ id: "2", name: "deck2" })

  const deckState: AppData = { version: 1, decks: [deck1, deck2], cards: [] }

  const result: AppData = reducer(deckState, { type: "rename_deck", id: deck1.id, name: "new name" })

  expect(result).toEqual({ version: 1, decks: [makeDeck({ id: "1", name: "new name" }), deck2], cards: [] })
})

test("add_card addds a new card to Cards[] and in the appropriated deck", () => {
  const card = makeCard({ id: "2", front: "xx", back: "ww" })
  const newCard = makeCard()

  const cardState: AppData = { version: 1, decks: [], cards: [card] }

  const result: AppData = reducer(cardState, { type: "add_card", card: newCard })

  expect(result).toEqual({ version: 1, decks: [], cards: [card, newCard] })
})

test("delete_card filters the cards and delete the right one", () => {
  const card = makeCard()
  const otherCard = makeCard({ id: "3" })
  const deletedCard = makeCard({ id: "2" })

  const cardState: AppData = { version: 1, decks: [], cards: [card, otherCard, deletedCard] }

  const result: AppData = reducer(cardState, { type: "delete_card", id: deletedCard.id })

  expect(result).toEqual({ version: 1, decks: [], cards: [card, otherCard] })
})
