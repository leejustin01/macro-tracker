import React, { useState } from 'react';

function Goal({ cal, tcal, protein, tprotein, fat, tfat, carbs, tcarbs }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>Goal</td>
            <td>Running Total</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Calories</td>
            <td>{cal}</td>
            <td>{tcal}</td>
          </tr>
          <tr>
            <td>Protein</td>
            <td>{protein}g</td>
            <td>{tprotein}g</td>
          </tr>
          <tr>
            <td>Fat</td>
            <td>{fat}g</td>
            <td>{tfat}g</td>
          </tr>
          <tr>
            <td>Carbs</td>
            <td>{carbs}g</td>
            <td>{tcarbs}g</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Goal;
