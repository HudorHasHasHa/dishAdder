import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import userReducer from './userReducer';

const initialState = {
  name: "",
  preparation_time: "",
  type: "pizza",
  no_of_slices: 2,
  diameter: 15
}

const reducers = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer,
  addUser : userReducer
})

const store = createStore(
  reducers,
  initialState
  );

export default store;