import React, { useState } from 'react';

function CartAmount() {
  const [state, setState] = useState(0);

  const increment = () => {
    setState(state + 1);
  };

  const decrement = () => {
    if (state > 0) {
      setState(state - 1);
    }
  };

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={increment}>add</button>
      <button onClick={decrement}>minus</button>
    </div>
  );
}

export default CartAmount;
