import { useState } from "react";
import {
  BrowserProvider,
  Contract,
  isAddress
} from "ethers";

const REGISTRY_ADDRESS =
  "YOUR_REGISTRY_ADDRESS";

const ABI = [
  "function resolve(string handle) view returns (address)",
  "function register(string handle,address wallet)",
  "function updateWallet(string handle,address wallet)"
];

export default function App() {

  const [handle, setHandle] =
    useState("");

  const [wallet, setWallet] =
    useState("");

  const [result, setResult] =
    useState("");

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Install a Web3 wallet first.");
      return;
    }

    const provider =
      new BrowserProvider(
        window.ethereum
      );

    await provider.send(
      "eth_requestAccounts",
      []
    );

    const signer =
      await provider.getSigner();

    const address =
      await signer.getAddress();

    setWallet(address);
  }

  async function resolveHandle() {

    if (!window.ethereum) {
      alert("Wallet not found.");
      return;
    }

    const provider =
      new BrowserProvider(
        window.ethereum
      );

    const registry =
      new Contract(
        REGISTRY_ADDRESS,
        ABI,
        provider
      );

    try {
      const address =
        await registry.resolve(handle);

      if (!isAddress(address)) {
        setResult(
          "Handle not found."
        );
        return;
      }

      setResult(address);

    } catch {
      setResult(
        "Unable to resolve handle."
      );
    }
  }

  async function registerHandle() {

    if (!wallet) {
      await connectWallet();
      return;
    }

    const provider =
      new BrowserProvider(
        window.ethereum
      );

    const signer =
      await provider.getSigner();

    const registry =
      new Contract(
        REGISTRY_ADDRESS,
        ABI,
        signer
      );

    try {
      const tx =
        await registry.register(
          handle,
          wallet
        );

      await tx.wait();

      setResult(
        "Handle registered successfully."
      );

    } catch (error) {
      console.error(error);

      setResult(
        "Registration failed."
      );
    }
  }

  return (
    <main className="container">

      <h1>HOLD</h1>

      <p>
        Pay by handle, not by address.
      </p>

      <button
        onClick={connectWallet}
      >
        {wallet
          ? "Wallet Connected"
          : "Connect Wallet"}
      </button>

      <input
        value={handle}
        onChange={(e) =>
          setHandle(e.target.value)
        }
        placeholder="@alice"
      />

      <div className="actions">

        <button
          onClick={resolveHandle}
        >
          Resolve
        </button>

        <button
          onClick={registerHandle}
        >
          Register
        </button>

      </div>

      {result && (
        <div className="result">
          {result}
        </div>
      )}

    </main>
  );
}
