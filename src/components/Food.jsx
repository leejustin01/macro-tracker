import React, { useState } from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Food({ food, onDelete }) {
  return (
    <tr>
        <td>{food.name}</td>
        <td>{food.cal}</td>
        <td>{food.protein}g</td>
        <td>{food.fat}g</td>
        <td>{food.carbs}g</td>
        <td><MdDeleteForever onClick={ () => onDelete(food._id) }/></td>
    </tr>
  );
}

export default Food;
