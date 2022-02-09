const { task } = require("hardhat/config");
const fs = require('fs')
const { constants, BigNumber } = require('ethers')
const { delay } = require('nanodelay')

function expandTo18Decimals(n) {
  return new BigNumber.from(n).mul(new BigNumber.from(10).pow(18))
}

const overrides = {
  gasLimit: 9999999
}

async function addLiquidity(AuroraAmount, WETHAmount) {
  const AURORA_TOKEN = await ethers.getContractAt("AuroraToken", "0xf06c68af82a938f9a737484f4073bf89a5edb271");
  const WETH_TOKEN = await ethers.getContractAt("AuroraToken", "0xe447Bb3b10112B2481327CC8345574eB43A738c9");
  // const wallet = new ethers.Wallet(process.env.AURORA_PRIVATE_KEY, ethers.provider)
  const router = await ethers.getContractAt("UniswapV2Router02", "0x0ec1f2fA6DfA35aA0A4D231a9806640273677Bd7");
  await AURORA_TOKEN.approve(router.address, constants.MaxUint256)
  await delay(1000)
  await WETH_TOKEN.approve(router.address, constants.MaxUint256)
  await delay(1000)

  const currentBlock = await ethers.provider.getBlock("latest")
  console.log('currentBlock', currentBlock)

  console.log('addLiquidity', await router.addLiquidity(
    AURORA_TOKEN.address,
    WETH_TOKEN.address,
    AuroraAmount,
    WETHAmount,
    AuroraAmount,
    WETHAmount,
    "0x23a824dD17d6571e1BAdd25A6247C685D6802985",
    constants.MaxUint256,
    // currentBlock.timestamp + 10000,
    overrides
  ))
}

task("AURORA/USDT_create_pair", "create pair")
  .setAction(async taskArgs => {
    const UniswapV2Factory = await ethers.getContractAt("UniswapV2Factory", "0xeF2c140F2E9c05A121C60b693850D2969fd3730c");

    await UniswapV2Factory.createPair(
      "0xaDeE31e4643D8891CaC9328B93BE002373428947", // AURORA
      "0xfa1Ee6A11A8Ac851dEd1EF449878d1eE20D135EC", // USDT
    )
  });

task("AURORA/USDT_get_pair", "get pair")
  .setAction(async taskArgs => {
    const UniswapV2Factory = await ethers.getContractAt("UniswapV2Factory", "0xeF2c140F2E9c05A121C60b693850D2969fd3730c");

    console.log("result: ", (await UniswapV2Factory.getPair(
      "0xaDeE31e4643D8891CaC9328B93BE002373428947", // AURORA
      "0xfa1Ee6A11A8Ac851dEd1EF449878d1eE20D135EC", // USDT
    )))
  });

task("AURORA/WETH_create_pair", "create pair")
  .setAction(async taskArgs => {
    const UniswapV2Factory = await ethers.getContractAt("UniswapV2Factory", "0xeF2c140F2E9c05A121C60b693850D2969fd3730c");

    await UniswapV2Factory.createPair(
      "0xf06c68af82a938f9a737484f4073bf89a5edb271", // AURORA
      "0xF7C427b03bF5774660A64b03F89170675dAc0382", // WETH
    )
  });

task("AURORA/ZAK_create_pair", "create pair")
  .setAction(async taskArgs => {
    const UniswapV2Factory = await ethers.getContractAt("UniswapV2Factory", "0xeF2c140F2E9c05A121C60b693850D2969fd3730c");

    await UniswapV2Factory.createPair(
      "0xf06c68af82a938f9a737484f4073bf89a5edb271", // AURORA
      "0xF7C427b03bF5774660A64b03F89170675dAc0382", // ZAK
    )
  });

task("AURORA/WETH_get_pair", "create pair")
  .setAction(async taskArgs => {
    const UniswapV2Factory = await ethers.getContractAt("UniswapV2Factory", "0xeF2c140F2E9c05A121C60b693850D2969fd3730c");

    console.log("result: ", (await UniswapV2Factory.getPair(
      "0xf06c68af82a938f9a737484f4073bf89a5edb271", // AURORA
      "0xe447Bb3b10112B2481327CC8345574eB43A738c9", // WETH
    )))
  });

task("setFee", "set fee")
  .setAction(async taskArgs => {
    const UniswapV2Factory = await ethers.getContractAt("UniswapV2Factory", "0xeF2c140F2E9c05A121C60b693850D2969fd3730c");

    console.log("result: ", (await UniswapV2Factory.setFeeTo("0x23a824dD17d6571e1BAdd25A6247C685D6802985")))
  });

task("feeTo", "get feeTo address")
  .setAction(async taskArgs => {
    const UniswapV2Factory = await ethers.getContractAt("UniswapV2Factory", "0xeF2c140F2E9c05A121C60b693850D2969fd3730c");

    console.log("result: ", (await UniswapV2Factory.feeTo()))
  });

task("balance", "get feeTo address")
  .setAction(async taskArgs => {
    const test = await ethers.getContractAt("AuroraToken", "0xe447Bb3b10112B2481327CC8345574eB43A738c9");

    console.log("result: ", await test.balanceOf("0x23a824dD17d6571e1BAdd25A6247C685D6802985"))
  });

task("addLiquidity", "get feeTo address")
  .setAction(async taskArgs => {
    const AuroraAmount = expandTo18Decimals(5)
    const WETHAmount = expandTo18Decimals(10)

    console.log("result: ", await addLiquidity(AuroraAmount, WETHAmount))
  });

// task("AURORA_to_WETH", "get feeTo address")
//   .setAction(async taskArgs => {
//     const AuroraAmount = expandTo18Decimals(5).mul(100).div(99)
//     const ETHAmount = expandTo18Decimals(10)
//     const amountIn = expandTo18Decimals(1)

//     const AuroraAmount = expandTo18Decimals(1)
//     const ETHAmount = expandTo18Decimals(1)

//     await DTT.approve(router.address, MaxUint256)

//     const UniswapV2Factory = await ethers.getContractAt("UniswapV2Router02", "0x0ec1f2fA6DfA35aA0A4D231a9806640273677Bd7");

//     await router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
//       amountIn,
//       0,
//       [DTT.address, WETH.address],
//       wallet.address,
//       MaxUint256,
//       overrides
//     )

//     console.log("result: ", await addLiquidity(AuroraAmount, ETHAmount))
//   });
