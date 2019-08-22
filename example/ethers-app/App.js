import React, { useState, useEffect, useRef } from "react";
import useCounterContract from "./useCounterContract";

const App = () => {
  const { count, increment } = useCounterContract();
  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
    </>
  );
};

export default App;
