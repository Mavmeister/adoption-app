import { combineReducers } from 'redux'
import {
  ANIMALS_REQUEST,
  ANIMALS_OK,
  ANIMALS_SAVE,
  SETTINGS_REQUEST,
  SETTINGS_UPDATE,
  SETTINGS_OK
} from '../actions'

export const initialState = {
  animals: [],
  savedAnimals: [],
  loading: false,
  settings: {
    id: 1001,
    profile: "",
    typePreference: "cat",
    ageRange: {
      "min": 9,
      "max": 10
    }
  }
}

const data = (state = initialState, action) => {
  switch (action.type) {
    case ANIMALS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ANIMALS_OK:
      return {
        ...state,
        animals: action.payload,
        loading: false
      }
    case ANIMALS_SAVE:
      return {
        ...state,
        savedAnimals: [...state.savedAnimals, action.payload],
        loading: false
      }
    case SETTINGS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SETTINGS_OK:
      return {
        ...state,
        settings: action.payload,
        loading: false
      }
    case SETTINGS_UPDATE:
      return {
        ...state,
        settings: action.payload,
        loading: false
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  data
})

export default rootReducer;