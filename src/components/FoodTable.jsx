import React, { useState } from 'react';
import Food from './Food';
import { FaPlus } from "react-icons/fa";

function FoodTable({ foods, onDelete, onAdd }) {
  return (
    <table id="food">
        <thead>
            <tr>
                <td>Food Item</td>
                <td>Calories</td>
                <td>Protein</td>
                <td>Fat</td>
                <td>carbs</td>
            </tr>
        </thead>
        <tbody>
            {foods.map((food, i) => <Food food={food} onDelete={onDelete} key={i} />)}
        </tbody>
    </table>
  );
}

export default FoodTable;
