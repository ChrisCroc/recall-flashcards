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
      }) }
    case "add_deck":
      return { ...state, decks:  [...state.decks, action.deck] }
    case "rename_deck":
      return { ...state, decks: state.decks.map(deck => {
        if (deck.id === action.id)
          return {...deck, name: action.name}
        else
          return deck
      }) }
    case "add_card":
      return { ...state, cards: [...state.cards, action.card] }
    case "delete_card":
      return { ...state, cards: state.cards.filter(card => card.id !== action.id) }
    default:
      throw new Error("Action inconnue : " + (action as Action).type)
  }
}
