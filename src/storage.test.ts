import { beforeEach, test, expect } from "vitest"
import { save, load } from "./storage"
import { makeCard } from "./testHelpers"
import type { AppData } from "./types"

beforeEach(() => {
  localStorage.clear()
})

const data: AppData = {
  version: 1,
  decks: [{
    id: "test id",
    name: "Test Deck",
    description: "A deck for testing",
    origin: "starter",
    createdAt: "2026-07-28"
  }],
  cards: [makeCard()]
}

test("save and load data", () => {
  save(data)
  const loaded = load()

  expect(loaded).toEqual(data)
})

test("when nothing has been saved, load() returns null", () => {
  const loaded = load()

  expect(loaded).toBe(null)
})
