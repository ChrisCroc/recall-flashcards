import { SCHEMA_VERSION } from "./storage"
import type { AppData } from "./types"

export const initialData: AppData =
  { version: SCHEMA_VERSION,
    decks: [ {
      id: "Deck1",
      name: "Javascript",
      origin: "starter",
      createdAt: "2026-08-06" },
    {
      id: "Deck2",
      name: "React",
      origin: "starter",
      createdAt: "2026-08-06"
    },
    {
      id: "Deck3",
      name: "TypeScript",
      origin: "starter",
      createdAt: "2026-08-06"
    } ],
    cards: [ {
      id: "1",
      deckId: "Deck1",
      front: "Javascript beginner",
      back: "string",
      createdAt: "2026-08-06",
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      dueDate: "2026-08-07" },
      {
      id: "2",
      deckId: "Deck1",
      front: "Javascript beginner",
      back: "string",
      createdAt: "2026-08-06",
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      dueDate: "2026-08-07" },
      {
      id: "3",
      deckId: "Deck2",
      front: "React beginner",
      back: "string",
      createdAt: "2026-08-06",
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      dueDate: "2026-08-07" },
      {
      id: "4",
      deckId: "Deck2",
      front: "React beginner",
      back: "string",
      createdAt: "2026-08-06",
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      dueDate: "2026-08-07" },
      {
      id: "5",
      deckId: "Deck3",
      front: "TypeScript beginner",
      back: "string",
      createdAt: "2026-08-06",
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      dueDate: "2026-08-07" },
      {
      id: "6",
      deckId: "Deck1",
      front: "TypeScript beginner",
      back: "string",
      createdAt: "2026-08-06",
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      dueDate: "2026-08-07" },
      {
      id: "7",
      deckId: "Deck1",
      front: "TypeScript beginner",
      back: "string",
      createdAt: "2026-08-06",
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      dueDate: "2026-08-07" },
      {
      id: "8",
      deckId: "Deck1",
      front: "TypeScript beginner",
      back: "string",
      createdAt: "2026-08-06",
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      dueDate: "2026-08-07" }
    ]
  }
