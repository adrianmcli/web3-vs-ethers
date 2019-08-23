import { useState, useRef, useEffect } from "react";
import Web3 from "web3";

import artifact from "../smart-contracts/build/contracts/Counter.json";

export default function useCounterContract() {
  const contract = useRef();
  const [count, setCount] = useState();

  // function to get current count and update UI
  const updateCount = async () => {
    const newCount = await contract.current.methods.getCount().call();
    setCount(newCount);
  };

  // function to invoke a mutating method on our contract
  const increment = async () => {
    await contract.current.methods.increment().send();
    updateCount(); // update count on UI after transaction is mined
  };

  useEffect(() => {
    // this is only run once on component mounting
    const setup = async () => {
      const web3 = new Web3("http://127.0.0.1:8545");
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const contractAddress = artifact.networks[networkId].address;

      // instantiate contract instance and assign to component ref variable
      contract.current = new web3.eth.Contract(artifact.abi, contractAddress, {
        from: accounts[0],
      });

      // update count on UI
      updateCount();
    };
    setup();
  }, []);

  return { count, increment };
}
