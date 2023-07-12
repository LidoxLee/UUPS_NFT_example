const { ethers } = require("hardhat");
const { upgrades } = require("hardhat");

const proxyAddress = "0x472CeF0C00303A3346E9D54170878f0Fd1B089b9";

async function main() {
  console.log("UUPS Proxy contract address", proxyAddress);

  const NFTV2 = await ethers.getContractFactory("UUPSNFTV2");
  console.log("deploy new impl. contract and upgrade proxy logic point to new impl...");

  const upgradeProxy = await upgrades.upgradeProxy(proxyAddress, NFTV2);

  console.log(
    "upgrade new logic contract address :",
    await upgrades.erc1967.getImplementationAddress(proxyAddress)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
