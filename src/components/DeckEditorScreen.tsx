import { useState } from "react"
import type { Card, Deck, Action } from "../types"
import type { Dispatch, ChangeEvent } from "react"

interface DeckEditorScreenProps {
  deckId: string | null
  decks: Deck[]
  cards: Card[]
  dispatch: Dispatch<Action>
  onExit: () => void
  onOpenDeck: (id: string) => void
}

export function DeckEditorScreen({ deckId, decks, cards, dispatch, onExit, onOpenDeck }: DeckEditorScreenProps) {

  const currentDeck =  deckId === null ? null : decks.find(deck => deck.id === deckId) ?? null

  const [text, setText] = useState(currentDeck === null ? "" : currentDeck.name)

  const inputText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  function handleSubmit() {
    if (currentDeck === null) {
      const newDeck: Deck = { id: crypto.randomUUID(), name: text, origin: "user", createdAt: new Date().toISOString() }
      dispatch({ type: "add_deck", deck: newDeck })
      onOpenDeck(newDeck.id)
    }
    else {
      dispatch({ type: "rename_deck", id: currentDeck.id, name: text })
    }
  }

  return (
    <div className="container">
      <h1>{currentDeck === null ? "New Deck" : currentDeck.name}</h1>
      <input type="text" value={text} onChange={inputText} />
      <button className="btn" onClick={handleSubmit}>Valider</button>
      <button className="btn" onClick={onExit}>Accueil</button>
    </div>
  )
}
