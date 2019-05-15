import React from 'react';
import './App.css';
import Movies from './components/movies'

function App() {
  return (
    <div className="App container">
      <h1 className = 'mb-2'>Movie Rentals</h1>
      <Movies />
    </div>
  );
}

export default App;
