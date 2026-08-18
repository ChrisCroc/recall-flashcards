import './App.css'
import { initialData } from './seedData'
import { useReducer, useEffect, useState } from "react"
import { reducer } from "./reducer"
import { load, save } from "./storage"
import type { Screen } from "./types"
import type { ReactNode } from "react"
import { dueCards } from "./dueCards"
import { ReviewScreen } from "./components/ReviewScreen"
import { DeckEditorScreen } from "./components/DeckEditorScreen"


function App() {

  const [data, dispatch] = useReducer(reducer, initialData, () => load() ?? initialData)

  const [screen, setScreen] = useState<Screen>({name: "decks" })

  useEffect(() => {
    save(data)
  }, [data])

  const reviewScreen = (deckId: string | null) => {
    setScreen({ name: "review", deckId: deckId })
  }

  const homeScreen = () => {
    setScreen({ name: "decks" })
  }

  const editorScreen = (deckId: string | null) => {
    setScreen({ name: "editor", deckId: deckId})
  }

  const today = new Date()

  const deckItems = data.decks.map(deck => {
    const count = dueCards(data.cards, today).filter((card) => card.deckId === deck.id).length
    return (
    <div key={deck.id} className="deck-row">
      <div>
        <span>{deck.name}</span>
        <br />
        <span>{count} {count > 1 ? "cartes dues" : "carte due"}</span>
        </div>
      <div>
        <button className="btn suppress-btn" onClick={() => dispatch({ type: "delete_deck", id: deck.id })}>
          Supprimer
        </button>
        <button className="btn review-btn" onClick={() => reviewScreen(deck.id)}>Réviser</button>
        <button className="btn editor-btn" onClick={() => editorScreen(deck.id)}>Modifier</button>
      </div>
    </div>
  )})

  const totalDueCards = dueCards(data.cards, today).length

  let content: ReactNode

  switch (screen.name) {
    case "decks":
      content =
        <div className="container">
          <h1>Accueil</h1>
          <div id="recap">{totalDueCards} cartes a revoir aujourd'hui
            {totalDueCards > 0 && (
                <button className="btn review-btn" onClick={() => reviewScreen(null)}>Tout réviser</button>
            )}
          </div>
          <div id="home">{deckItems}
            <div className="center-btn">
              <button className="btn add-btn" onClick={() => editorScreen(null)}>+ Nouveau deck</button>
            </div>
          </div>
        </div>
      break
    case "review": {
      const dueToday = dueCards(data.cards, today)
      const rightCards = screen.deckId === null
      ? dueToday
      : dueToday.filter((card) => card.deckId === screen.deckId)
      content =
        <ReviewScreen cards={rightCards} today={today} onExit={homeScreen} dispatch={dispatch} />
      break
    }
    case "editor":
      content =
        <DeckEditorScreen deckId={screen.deckId} decks={data.decks} cards={data.cards} dispatch={dispatch} onExit={homeScreen} onOpenDeck={editorScreen} />
      break
    default:
      content = <p>Ecran inconnu</p>
  }

  return (
      <>
        {content}
      </>
  )
}

export default App
