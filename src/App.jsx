import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Goal from './components/Goal.jsx';

function App() {
  const [tcal, setTcal] = useState([]);
  const [food, setFood] = useState([]); 

  return (
    <div>
      <Goal cal={2500} tcal={tcal} ></Goal>
      <footer>© 2024 Justin Lee</footer>
    </div>
  );
}

export default App;
