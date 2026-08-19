import { beforeEach, test, expect } from "vitest"
import { save, load, loadBackup, SCHEMA_VERSION } from "./storage"
import { makeCard } from "./testHelpers"
import type { AppData } from "./types"

beforeEach(() => {
  localStorage.clear()
})

const data: AppData = {
  version: SCHEMA_VERSION,
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

test("when the stored version is not the current one, load() returns null", () => {
  save({ ...data, version: 999 })

  const loaded = load()

  expect(loaded).toBe(null)
})

test("when the stored version is not the current one, the original text is kept and readable with loadBackup()", () => {
  const saved = { ...data, version: 999 }
  save(saved)

  load()

  expect(loadBackup()).toBe(JSON.stringify(saved))
})
