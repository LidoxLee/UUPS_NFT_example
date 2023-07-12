const { ethers, upgrades } = require("hardhat");

async function main() {
  const UUPSNFT = await ethers.getContractFactory("UUPSNFT");

  const proxy = await upgrades.deployProxy(UUPSNFT, [], {
    initializer: "initialize",
    kind: "uups",
  });

  const depoly = await proxy.waitForDeployment();
  console.log(" proxy contract address : ", depoly.target);

  console.log(
    "logic contract address :",
    await upgrades.erc1967.getImplementationAddress(depoly.target)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
