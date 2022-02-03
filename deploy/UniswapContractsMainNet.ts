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
      "0x843F6Cf740886C0F002798676d66052C28EAfF1D", // UniswapV2Factory
      "0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB" // WETH
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
          resolve(chainId !== "1313161554");
        });
      } catch (error) {
        reject(error);
      }
    });
}

func.dependencies = [];
