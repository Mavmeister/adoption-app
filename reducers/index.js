import { combineReducers } from 'redux'
import {
  ANIMALS_REQUEST,
  ANIMALS_OK,
} from '../actions'

const initialState = {
  animals: [
    {
      "id": 1001,
      "type": "cat",
      "name": "Patronus",
      "img": "https://s3-us-west-2.amazonaws.com/cozi-interview-dev/patronus.jpg",
      "sex": "M",
      "age": 8,
      "profile": "Patronus is a super chatty cat! He loves to be up high on a shelf or cuddling on the couch. He is a Hemmingway (polydactyl) so he does need a little extra care with nail clipping. He has a beautiful red/brown coat and is on a strict wet food diet."
    },
    {
      "id": 1002,
      "type": "dog",
      "name": "Riley",
      "img": "https://s3-us-west-2.amazonaws.com/cozi-interview-dev/riley.jpg",
      "sex": "M",
      "age": 5,
      "profile": "Despite being 40lbs Riley is a total lap dog and loves to cuddle. He is a Brittany with a lot of energy. He loves running, hiking, camping etc. He is also nose trained and can sniff out just about anything. Never been hunting but his prey instinct is very strong, prob wont be an off-leash dog."
    },
  ],
  settings: {
    id: 1001,
    profile: "",
    typePreference: "cat",
    ageRange: {
      "min": 0,
      "max": 20
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
    default:
      return state
  }
}

const rootReducer = combineReducers({
  data
})

export default rootReducer;