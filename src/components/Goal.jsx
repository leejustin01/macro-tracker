import React, { useState } from 'react';

function Goal({ cal, tcal }) {
  return (
    <div>
      <h1>Goals</h1>
      <p>Calories: {cal}</p>
      <p>Running Total: {tcal}</p>
    </div>
  );
}

export default Goal;
