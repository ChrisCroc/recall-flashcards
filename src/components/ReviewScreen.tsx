import { useState } from "react"
import type { Card, Action, Grade } from "../types"
import type { Dispatch } from "react"

const GRADES_MESSAGES: { note: Grade; message: string }[] = [
  { note: 1, message: "encore" },
  { note: 3, message: "difficile" },
  { note: 4, message: "ok" },
  { note: 5, message: "facile" }
]

interface ReviewScreenProps {
  cards: Card[]
  today: Date
  onExit: () => void
  dispatch: Dispatch<Action>
}

export function ReviewScreen({ cards, today, onExit, dispatch }: ReviewScreenProps) {

  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [grades, setGrades] = useState<Grade[]>([])
  const [sessionCards] = useState(cards)

  const currentCard = sessionCards[index]

  if (!currentCard) {
    const gradesCount = (g: Grade) => grades.filter(rep => rep === g).length
    return (
      <div className="container">
        <div className="session-end">
          <p>Session terminée</p>
          <p>{sessionCards.length} {sessionCards.length > 1 ? "cartes révisées" : "carte révisée"} lors de cette session</p>
          <div className="count-recap">
            {GRADES_MESSAGES.map(({ note, message }) => {
              const count = gradesCount(note)
              return (
                <p key={note}>
                  {count} { count > 1 ? "cartes notées" : "carte notée" } <span className="grade-name">{message}</span>
                </p>
              )
            })}
          </div>

          <button className="btn home-btn" onClick={onExit}>Retour aux decks</button>
        </div>
      </div>
    )
  }

  const reveal = () => {
    setRevealed(true)
  }

  const grade = (g: Grade) => {
    dispatch({ type: "grade_card", id: currentCard.id, grade: g, today })
    setGrades(prevGrades => [...prevGrades, g])
    setIndex(prevIndex => prevIndex + 1)
    setRevealed(false)
  }

  return (
    <div className="container">
      <h1>Réviser</h1>
      <div className="review-infos">
        <p>{`Carte ${index + 1} sur ${sessionCards.length}`}</p>
        <progress value={index} max={sessionCards.length}></progress>
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
