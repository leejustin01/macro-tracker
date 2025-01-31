import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

function AddFood({ onAdd }) {
  // State for form inputs
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [carbs, setCarbs] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Pass data to onAdd function
    onAdd(foodName, calories, protein, fat, carbs);

    // Clear form fields after submission
    setFoodName("");
    setCalories("");
    setProtein("");
    setFat("");
    setCarbs("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Food Name"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Protein (g)"
        value={protein}
        onChange={(e) => setProtein(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Fat (g)"
        value={fat}
        onChange={(e) => setFat(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Carbs (g)"
        value={carbs}
        onChange={(e) => setCarbs(e.target.value)}
        required
      />
      <button type="submit">
        <FaPlus /> Add Food
      </button>
    </form>
  );
}

export default AddFood;
