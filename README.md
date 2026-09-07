# HOLD

### Pay by handle, not by address.

HOLD makes crypto payments simpler.

Instead of copying long wallet addresses, send funds using a human-readable handle. HOLD resolves the handle to the recipient's wallet automatically.

**Nothing to paste. Nothing to mistype. Just HOLD.**

---

## Overview

Crypto wallets are powerful, but sending funds still often requires copying and pasting long, error-prone addresses.

HOLD introduces a simpler payment layer:

```text
@handle → wallet → payment
```

Users interact with handles instead of hexadecimal wallet addresses.

---

## How It Works

1. **Choose a handle**

   Users register a unique payment handle.

2. **Connect a wallet**

   The handle is linked to a wallet address.

3. **Send by handle**

   A sender enters the recipient's handle instead of their wallet address.

4. **Resolve automatically**

   HOLD resolves the handle to its associated wallet.

5. **Complete the transaction**

   The transaction is sent directly to the resolved wallet.

---

## Example

Instead of:

```text
0x71C7656EC7ab88b098defB751B7401B5f6d8976F
```

Use:

```text
@alice
```

The payment flow becomes:

```text
Sender
   │
   ▼
@alice
   │
   ▼
HOLD Resolver
   │
   ▼
Alice's Wallet
   │
   ▼
Payment
```

---

## Core Features

### Handle-Based Payments

Send assets using memorable handles rather than long wallet addresses.

### Wallet Resolution

Handles resolve to their currently registered wallet address.

### Simple UX

No address copying, pasting, or manually checking long strings.

### Onchain Resolution

The payment destination can be resolved through blockchain infrastructure rather than relying on a centralized contact list.

### Wallet Ownership

Handles are designed to be controlled by their owners through wallet-based authorization.

---

## Architecture

```text
┌─────────────────┐
│     User        │
│    @alice       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ HOLD Resolver   │
│                 │
│ @alice → 0x...  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Recipient Wallet│
│     0x...       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Blockchain    │
│    Transfer     │
└─────────────────┘
```

---

## Repository Structure

```text
hold/
├── contracts/
│   ├── HoldRegistry.sol
│   └── HoldResolver.sol
│
├── scripts/
│   ├── deploy.ts
│   └── register.ts
│
├── test/
│   ├── HoldRegistry.test.ts
│   └── HoldResolver.test.ts
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
│
├── docs/
│   └── architecture.md
│
├── README.md
├── package.json
└── LICENSE
```

---

## Smart Contract Model

At its core, HOLD maintains a relationship between a handle and a wallet.

```text
handle
   ↓
wallet address
```

Conceptually:

```solidity
mapping(bytes32 => address) public owners;
mapping(bytes32 => address) public wallets;
```

A resolver can then expose:

```solidity
function resolve(string calldata handle)
    external
    view
    returns (address);
```

---

## Registration

A user registers a handle and associates it with their wallet.

```text
@alice
   ↓
0x1234...abcd
```

The handle becomes the human-readable identifier for receiving payments.

---

## Resolution

When a sender enters:

```text
@alice
```

the application resolves it before creating the transaction:

```text
@alice
   ↓
resolve()
   ↓
0x1234...abcd
   ↓
transfer()
```

The sender never needs to manually enter the recipient's address.

---

## Security Principles

HOLD is designed around a few simple principles:

* **Self-custody** — funds remain in user-controlled wallets.
* **Explicit ownership** — handle changes require authorization.
* **Deterministic resolution** — a handle resolves to a defined wallet.
* **No private keys** — HOLD never needs custody of user keys.
* **Transparent infrastructure** — contract state can be independently verified.

> A handle identifies a destination. It does not custody the funds.

---

## Design Philosophy

### Less Address. More Identity.

Wallet addresses are optimized for machines.

Handles are optimized for people.

HOLD sits between the two.

```text
Human
  ↓
@handle
  ↓
Wallet
  ↓
Blockchain
```

---

## Roadmap

### Phase 1 — Core

* [ ] Handle registration
* [ ] Wallet resolution
* [ ] Handle ownership
* [ ] Basic payment flow
* [ ] Smart contract deployment

### Phase 2 — UX

* [ ] Wallet integration
* [ ] Handle search
* [ ] Payment requests
* [ ] Transaction history
* [ ] Mobile-friendly interface

### Phase 3 — Ecosystem

* [ ] Developer SDK
* [ ] Resolution API
* [ ] Merchant payments
* [ ] Cross-application handle support
* [ ] Additional chain integrations

---

## Development

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

Compile contracts:

```bash
npm run build
```

Run the development environment:

```bash
npm run dev
```

---

## Contributing

Contributions are welcome.

If you want to improve HOLD:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Add or update tests.
5. Open a pull request.

---

## License

This project is licensed under the MIT License.

---

# HOLD

**Pay by handle, not by address.**

```text
Nothing to paste.
Nothing to mistype.
Just HOLD.
```
