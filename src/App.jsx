import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div>
      <h1>Exercise Tracker</h1>
      <p>Welcome! Track your exercises with this full-stack Electron + React app!</p>
      <footer>© 2024 Justin Lee</footer>
    </div>
  );
}

export default App;
