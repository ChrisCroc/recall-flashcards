import type { AppData, Action } from "./types"
import { schedule } from "./sm2"

function replaceById<T extends { id: string }>(
  items: T[],
  id: string,
  update: (item: T) => T
): T[] {
  return items.map(item => item.id === id ? update(item) : item)
}

export function reducer(state: AppData, action: Action): AppData {
  switch (action.type) {
    case "delete_deck":
      return { ...state,
                decks: state.decks.filter(deck => deck.id !== action.id),
                cards: state.cards.filter(card => card.deckId !== action.id) }
    case "grade_card":
      return { ...state,
                  cards: replaceById(state.cards, action.id, card => schedule(card, action.grade, action.today))
      }

 //     return { ...state, cards: state.cards.map(card => {
 //       if (card.id === action.id)
 //         return schedule(card, action.grade, action.today)
 //       else
 //         return card
 //     }) }

    case "add_deck":
      return { ...state, decks:  [...state.decks, action.deck] }
    case "rename_deck":
      return { ...state,
                  decks: replaceById(state.decks, action.id, deck => ({ ...deck, name: action.name }))
      }

 //     return { ...state, decks: state.decks.map(deck => {
 //       if (deck.id === action.id)
 //         return {...deck, name: action.name}
 //       else
 //         return deck
 //     }) }

    case "add_card":
      return { ...state, cards: [...state.cards, action.card] }
    case "delete_card":
      return { ...state, cards: state.cards.filter(card => card.id !== action.id) }
    case "edit_card":
      return { ...state, cards: replaceById(state.cards, action.id, card => ({
        ...card, front: action.front, back: action.back }))
      }

 //     return { ...state, cards: state.cards.map(card => {
 //      if (card.id === action.id)
 //       return { ...card, front: action.front, back: action.back }
 //      else
 //       return card
 //     }) }
 
    default:
      throw new Error("Action inconnue : " + (action as Action).type)
  }
}
