import type { AppData, Action } from "./types"


export function reducer(state: AppData, action: Action): AppData {
  switch (action.type) {
    case "delete_deck":
      return { ...state, decks: state.decks.filter(deck => deck.id !== action.id) }
    default:
      throw new Error("Action inconnue : " + (action as Action).type)
  }
}
