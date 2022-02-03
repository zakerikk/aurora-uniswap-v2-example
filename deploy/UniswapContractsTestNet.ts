import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { network } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy("UniswapV2Factory", {
    from: deployer,
    args: [deployer],
    log: true,
  });

  await deploy("UniswapV2Router02", {
    from: deployer,
    args: [
      "0x3367ba7DaD94c3e7A8BBdEaEBdd704A6b29E632E", // UniswapV2Factory
      "0x806d2A014B1539bC46f55C819CB5b4f8B000b127" // WETH
    ],
    log: true,
  });

  // await deploy("UniswapV2ERC20", {
  //   from: deployer,
  //   args: [deployer],
  //   log: true,
  // });

  // await deploy("UniswapV2Pair", {
  //   from: deployer,
  //   args: [deployer],
  //   log: true,
  // });
};

export default func;

if (network.name !== "hardhat") {
  func.skip = ({ getChainId }) =>
    new Promise((resolve, reject) => {
      try {
        getChainId().then((chainId) => {
          resolve(chainId !== "1313161555");
        });
      } catch (error) {
        reject(error);
      }
    });
}

func.dependencies = [];
