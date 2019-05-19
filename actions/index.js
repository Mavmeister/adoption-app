import URLs from '../constants/URLs'

export const ANIMALS_REQUEST = 'ANIMALS_REQUEST';
export const ANIMALS_OK = 'ANIMALS_OK';
export const ANIMALS_SAVE = 'ANIMALS_SAVE';
export const SETTINGS_REQUEST = 'SETTINGS_REQUEST';
export const SETTINGS_UPDATE = 'SETTINGS_UPDATE';
export const SETTINGS_OK = 'SETTINGS_OK';

const animalsRequest = value => ({
  type: ANIMALS_REQUEST,
});
const animalsOk = value => ({
  type: ANIMALS_OK,
  payload: value,
});
const animalsSave = value => ({
  type: ANIMALS_SAVE,
  payload: value,
});
const settingsRequest = value => ({
  type: SETTINGS_REQUEST,
  payload: value,
});
const settingsOk = value => ({
  type: SETTINGS_OK,
  payload: value,
});
const settingsUpdate = value => ({
  type: SETTINGS_UPDATE,
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
const saveAnimals = (args = {}) => (dispatch) => {
  dispatch(animalsSave(args));
}

const fetchSettings = (args = {}) => (dispatch) => {
    dispatch(settingsRequest());
    return fetch(URLs.settings)
      .then(res => res.json())
      .then(json => {
        dispatch(settingsOk(json))
      })
}

const updateSettings = (args = {}) => (dispatch, getState) => {
  const state = getState();
  const newSettings = {...state.data.settings, ...args}
  dispatch(settingsUpdate(newSettings));
}


export {
  fetchAnimals,
  saveAnimals,
  fetchSettings,
  updateSettings
}