const Counter = artifacts.require("Counter");

module.exports = function(deployer) {
  deployer.deploy(Counter);
};
