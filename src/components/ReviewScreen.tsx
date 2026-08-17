import { useState } from "react"
import type { Card, Action, Grade } from "../types"
import type { Dispatch } from "react"

interface ReviewScreenProps {
  cards: Card[]
  today: Date
  onExit: () => void
  dispatch: Dispatch<Action>
}

export function ReviewScreen({ cards, today, onExit, dispatch }: ReviewScreenProps) {

  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const currentCard = cards[index]

  if (!currentCard) {
    return (
      <div className="container">
        <p>Session terminée</p>
        <button className="btn home-btn" onClick={onExit}>Retour aux decks</button>
      </div>
    )
  }

  const reveal = () => {
    setRevealed(true)
  }

  const grade = (g: Grade) => {
    dispatch({ type: "grade_card", id: currentCard.id, grade: g, today })
    setIndex(prevIndex => prevIndex + 1)
    setRevealed(false)
  }

  return (
    <div className="container">
      <h1>Réviser</h1>
      <div className="review-infos">
        <p>{currentCard.front}</p>
        {!revealed && <button className="btn easy-btn" onClick={reveal}>Révéler</button>}
        {revealed && <p>{currentCard.back}</p>}
        {revealed &&
          (<>
            <div className="grades">
              <button className="btn failed-btn" onClick={() => grade(1)}>Encore</button>
              <button className="btn hard-btn" onClick={() => grade(3)}>Difficile</button>
              <button className="btn ok-btn" onClick={() => grade(4)}>Ok</button>
              <button className="btn easy-btn" onClick={() => grade(5)}>Facile</button>
            </div>
          </>)}
          <div className="editor-home-btn">
            <button className="btn home-btn" onClick={onExit}>Accueil</button>
          </div>
        </div>
    </div>
  )
}
