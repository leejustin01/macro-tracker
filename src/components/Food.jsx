import React, { useState } from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Food({ food, onDelete, onAdd, mode }) {
  return (
    <tr>
        <td>{food.name}</td>
        <td>{food.cal}</td>
        <td>{food.protein}g</td>
        <td>{food.fat}g</td>
        <td>{food.carbs}g</td>
        <td>
          {mode === "delete" && <MdDeleteForever onClick={() => onDelete(food._id)} />}
          {mode === "add" && <FaPlus onClick={() => onAdd(food._id)} />}
        </td>
    </tr>
  );
}

export default Food;
