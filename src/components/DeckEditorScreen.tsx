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
  const currentCards = currentDeck === null ? [] : cards.filter(card => currentDeck.id === card.deckId)
  const [text, setText] = useState(currentDeck === null ? "" : currentDeck.name)
  const [rectoText, setRectoText] = useState("")
  const [versoText, setVersoText] = useState("")

  const cardDisplay = currentCards.map(card => (
    <div key={card.id} className="card-display">
      <p>{card.front}</p>
      <p>{card.back}</p>
      <button className="btn suppress-btn" onClick={() => dispatch({ type: "delete_card", id: card.id })}>Supprimer</button>
    </div>
  ))

  const inputText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const inputRectoText = (e: ChangeEvent<HTMLInputElement>) => {
    setRectoText(e.target.value)
  }

  const inputVersoText = (e: ChangeEvent<HTMLInputElement>) => {
    setVersoText(e.target.value)
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

  function handleCardSubmit() {
    const today = new Date().toISOString()
    if (currentDeck === null) return
    const newCard: Card = {
                            id: crypto.randomUUID(),
                            deckId: currentDeck.id,
                            front: rectoText,
                            back: versoText,
                            createdAt: new Date().toISOString(),
                            easeFactor: 2.5,
                            interval: 0,
                            repetitions: 0,
                            dueDate: today
                          }
    dispatch({ type: "add_card", card: newCard})
    setRectoText("")
    setVersoText("")
  }

  return (
    <div className="container">
      <h1>{currentDeck === null ? "New Deck" : currentDeck.name}</h1>
      {cardDisplay}
      <div className="name-action">
        <h3>{currentDeck === null ? "Nouveau deck" : "Modifier le nom du deck"}</h3>
        <div className="name-action-entries">
          <input type="text" value={text} onChange={inputText} />
          <button className="btn easy-btn" onClick={handleSubmit}>Valider</button>
        </div>
      </div>
      <div className="cards-infos">
        <h3>Nouvelle carte</h3>
        <div className="card-input">
          <span>
          <p>Question</p>
          <input type="text" value={rectoText} onChange={inputRectoText} />
          </span>
          <span>
            <p>Réponse</p>
            <input type="text" value={versoText} onChange={inputVersoText} />
            <button className="btn easy-btn" onClick={handleCardSubmit}>Valider</button>
          </span>
        </div>
      </div>
      <div className="editor-home-btn">
        <button className="btn home-btn" onClick={onExit}>Accueil</button>
      </div>
    </div>
  )
}
