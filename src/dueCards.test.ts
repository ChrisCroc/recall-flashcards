import { test, expect } from "vitest"
import { makeCard } from "./testHelpers"
import { dueCards } from "./dueCards"

test("when a card dueDate is in the past, it should be included in the due cards for today", () => {
  const today = new Date("2026-09-01")
  const card = makeCard({ id: "past", dueDate: new Date("2026-08-01").toISOString() })
  const result = dueCards([card], today)

  expect(result).toHaveLength(1)
  expect(result[0].id).toBe("past")
})

test("when a card dueDate is in the future, it should not be included in the due cards for today", () => {
  const today = new Date("2026-09-01")
  const card = makeCard({ id: "future", dueDate: new Date("2026-10-01").toISOString() })
  const result = dueCards([card], today)

  expect(result).toHaveLength(0)
})

test("when a card dueDate is today, it should be included in the due cards for today", () => {
  const today = new Date("2026-09-01")
  const card = makeCard({ id: "today", dueDate: new Date("2026-09-01").toISOString() })
  const result = dueCards([card], today)

  expect(result).toHaveLength(1)
  expect(result[0].id).toBe("today")
})

test("when multiple cards are provided, only those with dueDate in the past or today should be included", () => {
  const today = new Date("2026-09-01")
  const pastCard = makeCard({ id: "past", dueDate: new Date("2026-08-01").toISOString() })
  const futureCard = makeCard({ id: "future", dueDate: new Date("2026-10-01").toISOString() })
  const todayCard = makeCard({ id: "today", dueDate: new Date("2026-09-01").toISOString() })
  const result = dueCards([pastCard, futureCard, todayCard], today).map((card) => card.id)

  expect(result).toEqual(["past", "today"])
})
