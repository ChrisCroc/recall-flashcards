import type { AppData, Action } from "./types"
import { schedule } from "./sm2"


export function reducer(state: AppData, action: Action): AppData {
  switch (action.type) {
    case "delete_deck":
      return { ...state, decks: state.decks.filter(deck => deck.id !== action.id) }
    case "grade_card":
      return { ...state, cards: state.cards.map(card => {
        if (card.id === action.id)
          return schedule(card, action.grade, action.today)
        else
          return card
      } )}
    case "add_deck":
      return {}
    default:
      throw new Error("Action inconnue : " + (action as Action).type)
  }
}
