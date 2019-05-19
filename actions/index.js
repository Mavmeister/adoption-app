import URLs from '../constants/URLs'

export const ANIMALS_REQUEST = 'ANIMALS_REQUEST';
export const ANIMALS_OK = 'ANIMALS_OK';

const animalsRequest = value => ({
  type: ANIMALS_REQUEST,
});
const animalsOk = value => ({
  type: ANIMALS_OK,
  payload: value,
});

const fetchAnimals = (args = {}) => (dispatch) => {
    dispatch(animalsRequest());
    return fetch(URLs.animals)
      .then(res => res.json())
      .then(json => {
        dispatch(animalsOk(json))
      })
}

export {
  fetchAnimals
}