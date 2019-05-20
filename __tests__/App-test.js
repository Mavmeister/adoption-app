import 'react-native';
import * as actions from '../actions';
import rootReducer, { initialState } from '../reducers';
import React from 'react';
import Saved from '../screens/Saved';
import { store } from '../store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';


test('Saved renders correctly', () => {
  const tree = renderer.create(
  <Provider store={store}>
    <Saved />
  </Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Returns initial state', () => {
  expect(rootReducer(initialState, {type: "TEST"})).toEqual({
    "data": {
      "animals": [],
      "loading": false,
        "savedAnimals": [],
        "settings": {
          "ageRange": {
            "max": 10,
            "min": 9,
          },
          "id": 1001,
          "profile": "",
          "typePreference": "cat",
        },
    }
  })
});

// describe('Actions', () => {
//   it('Should fetch animals', () => {
//     const expectedAction = {
//       type: actions.ANIMALS_REQUEST
//     };
//     expect(actions.fetchAnimals()).toEqual(expectedAction)
//   })
// })
// describe('Reducers', () => {
//   it('Should return the initial state', () => {
//     expect(rootReducer(undefined, {}).toEqual({}))
//   })
// })