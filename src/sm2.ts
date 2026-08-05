import type { Card, Grade } from "./types"

export function schedule(card: Card, grade: Grade, today: Date): Card {
  let newInterval
  let newRepetitions
  let newEaseFactor

  if (grade >= 3) {
    if (card.repetitions === 0) {
      newInterval = 1
      newRepetitions = card.repetitions + 1
    } else if (card.repetitions === 1) {
      newInterval = 6
      newRepetitions = card.repetitions + 1
    } else {
      newInterval = Math.round(card.interval * card.easeFactor)
      newRepetitions = card.repetitions + 1
    }
  } else {
    newInterval = 1
    newRepetitions = 0
  }
  newEaseFactor = card.easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
  if (newEaseFactor < 1.3) {
    newEaseFactor = 1.3
  }
  return {
    ...card,
    interval: newInterval,
    repetitions: newRepetitions,
    dueDate: new Date(today.getTime() + newInterval * 24 * 60 * 60 * 1000).toISOString(),
    easeFactor: newEaseFactor,
  }
}
