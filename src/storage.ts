import type { AppData } from "./types"

const STORAGE_KEY = "recall-flashcards"
const BACKUP_KEY = STORAGE_KEY + ".backup"
export const SCHEMA_VERSION = 1

export function save(data: AppData): void {
  const stored = JSON.stringify(data)
  localStorage.setItem(STORAGE_KEY, stored)
}

export function load(): AppData | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === null) return null

  const storedData = JSON.parse(stored)

  if (storedData.version !== SCHEMA_VERSION) {
    localStorage.setItem(BACKUP_KEY, stored)
    return null
  }

  return storedData
}

export function loadBackup(): string | null {
  return localStorage.getItem(BACKUP_KEY)
}
