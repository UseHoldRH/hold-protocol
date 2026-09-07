import { ethers } from "hardhat";

async function main() {
  console.log("Deploying HOLD...");

  const Registry = await ethers.getContractFactory(
    "HoldRegistry"
  );

  const registry = await Registry.deploy();

  await registry.waitForDeployment();

  const registryAddress =
    await registry.getAddress();

  console.log(
    "HoldRegistry:",
    registryAddress
  );

  const Resolver = await ethers.getContractFactory(
    "HoldResolver"
  );

  const resolver = await Resolver.deploy(
    registryAddress
  );

  await resolver.waitForDeployment();

  console.log(
    "HoldResolver:",
    await resolver.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
