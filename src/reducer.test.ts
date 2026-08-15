import { test, expect } from "vitest"
import { makeCard } from "./testHelpers"
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
