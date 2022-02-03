const { task } = require("hardhat/config");
const fs = require('fs')

task("AURORA/USDT_create_pair", "create pair")
  .setAction(async taskArgs => {
    const UniswapV2Factory = await ethers.getContractAt("UniswapV2Factory", "0x3367ba7DaD94c3e7A8BBdEaEBdd704A6b29E632E");

    await UniswapV2Factory.createPair(
      "0xaDeE31e4643D8891CaC9328B93BE002373428947", // AURORA
      "0xfa1Ee6A11A8Ac851dEd1EF449878d1eE20D135EC", // USDT
    )
  });

task("AURORA/USDT_get_pair", "get pair")
  .setAction(async taskArgs => {
    const UniswapV2Factory = await ethers.getContractAt("UniswapV2Factory", "0x3367ba7DaD94c3e7A8BBdEaEBdd704A6b29E632E");

    console.log("result: ", (await UniswapV2Factory.getPair(
      "0xaDeE31e4643D8891CaC9328B93BE002373428947", // AURORA
      "0xfa1Ee6A11A8Ac851dEd1EF449878d1eE20D135EC", // USDT
    )))
  });
