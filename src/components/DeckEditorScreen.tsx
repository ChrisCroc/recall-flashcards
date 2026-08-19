import { useState, useRef, useEffect } from "react"
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
  const ref = useRef<HTMLInputElement>(null)
  // States

  const [text, setText] = useState(currentDeck === null ? "" : currentDeck.name)
  const [rectoText, setRectoText] = useState("")
  const [versoText, setVersoText] = useState("")
  const [currentCard, setCurrentCard] = useState<string | null>(null)
  const [cardRectoText, setCardRectoText] = useState("")
  const [cardVersoText, setCardVersoText] = useState("")

  function modifyCard(modifiedCard: Card) {
    setCurrentCard(modifiedCard.id)
    setCardRectoText(modifiedCard.front)
    setCardVersoText(modifiedCard.back)
  }

  const cardDisplay = currentCards.map(card => (
    <div key={card.id} className="card-display">
      <p>{card.front}</p>
      <p>{card.back}</p>
      <button className="btn suppress-btn" onClick={() => dispatch({ type: "delete_card", id: card.id })}>Supprimer</button>
      <button className="btn editor-btn" onClick={() => modifyCard(card)}>Modifier</button>
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

  const inputRectoCardText = (e: ChangeEvent<HTMLInputElement>) => {
    setCardRectoText(e.target.value)
  }

  const inputVersoCardText = (e: ChangeEvent<HTMLInputElement>) => {
    setCardVersoText(e.target.value)
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

  function handleSubmitModify() {
    if (currentCard === null) return
    dispatch({ type: "edit_card", id: currentCard, front: cardRectoText, back: cardVersoText })
    setCurrentCard(null)
  }

  useEffect(() => {
    ref.current?.focus()
  }, [currentCard])

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
      {currentCard !== null &&
        <div>
          <input type="text" ref={ref} value={cardRectoText} onChange={inputRectoCardText} />
          <input type="text" value={cardVersoText} onChange={inputVersoCardText} />
          <button className="btn easy-btn" onClick={handleSubmitModify}>Valider</button>
        </div>
      }
      <div className="editor-home-btn">
        <button className="btn home-btn" onClick={onExit}>Accueil</button>
      </div>
    </div>
  )
}
