import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const initialState = {
  name: "",
  preparation_time: "",
  type: "pizza",
  no_of_slices: 2,
  diameter: 15,
  spiciness_scale: 1
}

const reducers = combineReducers({
  form: formReducer
})

const store = createStore(
  reducers,
  initialState
  );

export default store;