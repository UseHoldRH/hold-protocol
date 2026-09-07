import { expect } from "chai";
import { ethers } from "hardhat";

describe("HoldRegistry", function () {

  async function deploy() {
    const [owner, alice, bob] =
      await ethers.getSigners();

    const Registry =
      await ethers.getContractFactory(
        "HoldRegistry"
      );

    const registry =
      await Registry.deploy();

    await registry.waitForDeployment();

    return {
      registry,
      owner,
      alice,
      bob
    };
  }

  it("registers a handle", async function () {
    const {
      registry,
      alice
    } = await deploy();

    await registry
      .connect(alice)
      .register(
        "@alice",
        alice.address
      );

    expect(
      await registry.resolve("@alice")
    ).to.equal(alice.address);
  });

  it("supports case-insensitive resolution", async function () {
    const {
      registry,
      alice
    } = await deploy();

    await registry
      .connect(alice)
      .register(
        "@Alice",
        alice.address
      );

    expect(
      await registry.resolve("@alice")
    ).to.equal(alice.address);

    expect(
      await registry.resolve("@ALICE")
    ).to.equal(alice.address);
  });

  it("prevents duplicate handles", async function () {
    const {
      registry,
      alice,
      bob
    } = await deploy();

    await registry
      .connect(alice)
      .register(
        "@alice",
        alice.address
      );

    await expect(
      registry
        .connect(bob)
        .register(
          "@alice",
          bob.address
        )
    ).to.be.revertedWith(
      "Handle already registered"
    );
  });

  it("allows the owner to update wallet", async function () {
    const {
      registry,
      alice,
      bob
    } = await deploy();

    await registry
      .connect(alice)
      .register(
        "@alice",
        alice.address
      );

    await registry
      .connect(alice)
      .updateWallet(
        "@alice",
        bob.address
      );

    expect(
      await registry.resolve("@alice")
    ).to.equal(bob.address);
  });

  it("prevents non-owner wallet updates", async function () {
    const {
      registry,
      alice,
      bob
    } = await deploy();

    await registry
      .connect(alice)
      .register(
        "@alice",
        alice.address
      );

    await expect(
      registry
        .connect(bob)
        .updateWallet(
          "@alice",
          bob.address
        )
    ).to.be.revertedWith(
      "Not handle owner"
    );
  });

  it("allows the owner to release a handle", async function () {
    const {
      registry,
      alice
    } = await deploy();

    await registry
      .connect(alice)
      .register(
        "@alice",
        alice.address
      );

    await registry
      .connect(alice)
      .release("@alice");

    expect(
      await registry.exists("@alice")
    ).to.equal(false);
  });
});
