import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { network, ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy("UniswapV2Factory", {
    from: deployer,
    args: [deployer],
    log: true,
  });

  const UniswapV2Factory = await ethers.getContract("UniswapV2Factory")

  await deploy("UniswapV2Router02", {
    from: deployer,
    args: [
      UniswapV2Factory.address,
      "0xe447Bb3b10112B2481327CC8345574eB43A738c9", // WETH
    ],
    log: true,
  });

  await deploy("UniswapV2ERC20", {
    from: deployer,
    log: true,
  });

  await deploy("WETH9Mock", {
    from: deployer,
    log: true,
  });

  await deploy("UniswapV2Pair", {
    from: deployer,
    log: true,
  });

  const UniswapV2Pair = await ethers.getContract("UniswapV2Pair")

  await UniswapV2Pair.initialize("0xf06c68af82a938f9a737484f4073bf89a5edb271", "0xe447Bb3b10112B2481327CC8345574eB43A738c9")


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
