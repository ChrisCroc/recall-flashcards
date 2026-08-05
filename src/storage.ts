import type { AppData } from "./types"

const STORAGE_KEY = "recall-flashcards"

export function save(data: AppData): void {
  const stored = JSON.stringify(data)
  localStorage.setItem(STORAGE_KEY, stored)
}

export function load(): AppData | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === null) return null
  return JSON.parse(stored)
}
