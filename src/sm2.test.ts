import { test, expect } from "vitest"
import { schedule } from "./sm2"
import type { Grade } from "./types"
import { makeCard } from "./testHelpers"

test("a new card with grade 'Good' must have an interval of 1 and repetitions of 1", () => {
  const card = makeCard()

  const grade: Grade = 4 // Good
  const today = new Date("2026-09-01")
  const result = schedule(card, grade, today)

  expect(result.interval).toBe(1)
  expect(result.repetitions).toBe(1)
})

test("when a card has the grade 'Easy', the ease factor must increase by 0.1", () => {
  const card = makeCard()

  const grade: Grade = 5 // Easy
  const today = new Date("2026-09-01")
  const result = schedule(card, grade, today)

  expect(result.easeFactor).toBeCloseTo(2.6)
})

test("when a card has the grade 'Again', the repetitions must reset to 0 and the interval must be set to 1", () => {
  const card = makeCard({ interval: 10, repetitions: 3 })

  const grade: Grade = 1 // Again
  const today = new Date("2026-09-01")
  const result = schedule(card, grade, today)

  expect(result.repetitions).toBe(0)
  expect(result.interval).toBe(1)
})

test("the ease factor must not go below 1.3", () => {
  const card = makeCard({ easeFactor: 1.3 })

  const grade: Grade = 1 // Again
  const today = new Date("2026-09-01")
  const result = schedule(card, grade, today)

  expect(result.easeFactor).toBe(1.3)
})

test("when the grade is 3 or above and the repetitions is 1, the interval must be set to 6", () => {
  const card = makeCard({ interval: 1, repetitions: 1})

  const grade: Grade = 4 // Good
  const today = new Date("2026-09-01")
  const result = schedule(card, grade, today)

  expect(result.interval).toBe(6)
  expect(result.repetitions).toBe(2)
})

test("when the grade is 3 or above and the repetitions is greater than 1, the interval must be calculated using the ease factor", () => {
  const card = makeCard({ interval: 6, repetitions: 2 })

  const grade: Grade = 4 // Good
  const today = new Date("2026-09-01")
  const result = schedule(card, grade, today)

  expect(result.interval).toBe(15)
  expect(result.repetitions).toBe(3)
})
