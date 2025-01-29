import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Goal from './components/Goal';
import FoodTable from './components/FoodTable';

function App() {
  const [foods, setFoods] = useState([]); 
  const [goals, setGoals] = useState([]);
  const [tcal, setTcal] = useState([]);
  const [tprotein, setTprotein] = useState([]);
  const [tfat, setTfat] = useState([]);
  const [tcarbs, setTcarbs] = useState([]);

  const loadFoods = async () => {
    try {
      const foodsJSON = await window.food.get();
      const foodsArray = JSON.parse(foodsJSON);
      setFoods(Array.isArray(foodsArray) ? foodsArray : []);
    } catch (e) {
      console.log("Error loading foods:", e);
    }
  };

  const loadGoals = async () => {
    try {
      const goalsJSON = await window.goal.get();
      const goalsArray = JSON.parse(goalsJSON);
      setGoals(Array.isArray(goalsArray) ? goalsArray : [0, 0, 0, 0]);
    } catch (e) {
      console.log("Error loading goals:", e);
    }
  }
  
  const updateMacros = () => {
    let newTcal = 0;
    let newTprotein = 0;
    let newTfat = 0;
    let newTcarbs = 0;
    for(let food of foods) {
      newTcal += food.cal;
      newTprotein += food.protein;
      newTfat += food.fat;
      newTcarbs += food.carbs;
    }
    setTcal(newTcal.toFixed(1));
    setTprotein(newTprotein.toFixed(1));
    setTfat(newTfat.toFixed(1));
    setTcarbs(newTcarbs.toFixed(1));
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
    loadGoals();
  }, []);

  useEffect(() => {
    updateMacros();
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
      <Goal cal={goals[0]} tcal={tcal} protein={goals[1]} tprotein={tprotein} fat={goals[2]} tfat={tfat} carbs={goals[3]} tcarbs={tcarbs}></Goal>
      <FoodTable foods={foods} onDelete={onDelete} onAdd={onAdd}></FoodTable>
      <footer>© 2024 Justin Lee</footer>
    </div>
  );
}

export default App;
