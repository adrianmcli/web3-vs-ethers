# Web3.js vs Ethers.js

A guide to the basic differences between Web3.js and Ethers.js, the two most popular libraries for interacting with the Ethereum blockchain. And two example frontend apps using React + Hooks!

---

## Sample Dapp Contract

Inside the `smart-contracts` folder, you will find a simple Truffle project with the following Solidity contract:

```
pragma solidity ^0.5.0;

contract Counter {
  uint count = 0;

  function increment() public {
    count = count + 1;
  }

  function getCount() public view returns (uint) {
    return count;
  }
}
```

## Setup Truffle project

Before you run any of the frontend UIs, make sure to start the development console with `truffle develop`, and then run the `migrate` command to compile and deploy the contract onto the development chain.

## Two Frontend UIs

There are two folders (`app-ethers` and `app-web3js`) each containing a simple React frontend for the above contract. The only substantial difference between these two UIs is located in the `useCounterContract.js` files.

Here are the direct links for your convenience:

- [Ethers.js App](./app-ethers/useCounterContract.js)
- [Web3.js App](./app-web3js/useCounterContract.js)

### Running the apps

In each of these apps, you can serve the frontends with the following commands:

```
npm install
npm start
```

This will serve the frontend on `http://localhost:1234` which you can view in your browser.

## Differences

There are three major portions in this code: the setup, reading (calling a constant method), and writing (calling a non-constant mutating method).

### Setup

With Web3.js, we need the following to instantiate a connected contract instance that can make read/write calls:

- contract ABI
- deployed contract address
- a `from` address (for `send` transactions)

Note that the `networkId` is required for us to fetch the deployed address from our contract artifact.

```js
// Web3.js
const web3 = new Web3("http://127.0.0.1:8545");
const accounts = await web3.eth.getAccounts();
const networkId = await web3.eth.net.getId();
const contractAddress = artifact.networks[networkId].address;

contractInstance = new web3.eth.Contract(artifact.abi, contractAddress, {
  from: accounts[0],
});
```

With Ethers.js, we need the following for our contract instance:

- deployed contract address
- contract ABI
- a `Signer` object (similar to `Provider`, but with a specified `Signer`)

```js
// Ethers.js
const provider = new ethers.providers.JsonRpcProvider();
const network = await provider.getNetwork();
const contractAddress = artifact.networks[network.chainId].address;

contractInstance = new ethers.Contract(
  contractAddress,
  artifact.abi,
  provider.getSigner(),
);
```

### Calling a constant method

```js
// Web3.js
const count = await contractInstance.methods.getCount().call();
console.log(count); // returns a String
```

```js
// Ethers.js
const count = await contractInstance.getCount();
console.log(count); // returns a BigNumber instance
```

These two are very similar, but in our example Ethers.js returns a BigNumber instance by default whereas Web3.js will return the number as a String.

### Calling a non-constant method

```js
// Web3.js
await contract.current.methods.increment().send();
// tx has been mined
```

```js
// Ethers.js
const tx = await contract.current.increment();
await tx.wait(); // wait for mining
```

Note that Web3.js will return a [PromiEvent](https://web3js.readthedocs.io/en/v1.2.1/callbacks-promises-events.html?highlight=promievent#callbacks-promises-events) which allows you to subscribe to confirmations, errors, and the transaction hash.

Ethers.js will return a transaction object where a bunch of information relating to the transaction is kept. You can grab the hash via `tx.hash`, but you must `await` on `tx.wait()` if you want to make sure it has been mined.
