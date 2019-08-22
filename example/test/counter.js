const Counter = artifacts.require("./Counter.sol");

contract("Counter", accounts => {
  it("...should increment.", async () => {
    const counter = await Counter.deployed();

    const countBefore = await counter.getCount.call();

    await counter.increment({ from: accounts[0] });

    const countAfter = await counter.getCount.call();

    assert.equal(countBefore, 0, "The count did not start at 0.");
    assert.equal(countAfter, 1, "The count was not incremented.");
  });
});
