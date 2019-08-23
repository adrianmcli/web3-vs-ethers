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
