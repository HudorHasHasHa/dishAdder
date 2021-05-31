import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import DishForm from './components/views/DishForm';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
        </header>
        <DishForm/>
      </div>
    </Provider>
  );
}

export default App;
