import { useState, useRef, useEffect } from "react";
import { ethers } from "ethers";

import artifact from "../smart-contracts/build/contracts/Counter.json";

export default function useCounterContract() {
  const contract = useRef();
  const [count, setCount] = useState();

  // function to get current count and update UI
  const updateCount = async () => {
    const newCount = await contract.current.getCount();
    setCount(newCount.toString());
  };

  // function to invoke a mutating method on our contract
  const increment = async () => {
    const tx = await contract.current.increment();
    await tx.wait(); // wait for mining
    updateCount(); // update count on UI
  };

  useEffect(() => {
    // this is only run once on component mounting
    const setup = async () => {
      const provider = new ethers.providers.JsonRpcProvider();
      
      const chainId = Object.keys(artifact.networks)[0];
      const contractAddress = artifact.networks[chainId].address;

      // instantiate contract instance and assign to component ref variable
      contract.current = new ethers.Contract(
        contractAddress,
        artifact.abi,
        provider.getSigner(),
      );

      // update count on UI
      await updateCount().catch(e => console.log('UpdateCount Error: ', e.message));;
    };
    setup();
  }, []);

  return { count, increment };
}
