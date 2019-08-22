import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(-1);
  const increment = () => setCount(count + 1);
  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
    </>
  );
};

export default App;
