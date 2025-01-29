import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Goal from './components/Goal';
import FoodTable from './components/FoodTable';

function App() {
  const [tcal, setTcal] = useState([]);
  const [foods, setFoods] = useState([]); 

  const loadFoods = async () => {
    try {
      const foodsJSON = await window.food.get();
      const foodsArray = JSON.parse(foodsJSON);
      setFoods(Array.isArray(foodsArray) ? foodsArray : []);
    } catch (e) {
      console.log("Error loading foods:", e);
    }
  };
  
  const updateTcal = () => {
    let newTcal = 0;
    for(let food of foods) {
      newTcal += food.cal;
    }
    setTcal(newTcal);
  };
  

  const onDelete = _id => {
    const newFoods = foods.filter(food => food._id != _id);
    setFoods(newFoods);
  };

  const onAdd = () => {
    console.log("ADD BUTTON PRESSED");
    
  };

  useEffect(() => {
    loadFoods();
  }, []);

  useEffect(() => {
    updateTcal();
    const saveFoods = async () => {
      try {
        const foodsJSON = JSON.stringify(foods);
        console.log("Saving:", foodsJSON);
        await window.food.put(foodsJSON);
    } catch (error) {
        console.error("Error saving foods:", error);
    }
    };
    saveFoods();
  }, [foods]);

  return (
    <div>
      <Goal cal={2500} tcal={tcal} ></Goal>
      <FoodTable foods={foods} onDelete={onDelete} onAdd={onAdd}></FoodTable>
      <footer>© 2024 Justin Lee</footer>
    </div>
  );
}

export default App;
