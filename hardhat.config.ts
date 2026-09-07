import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.24",

  networks: {
    hardhat: {},

    robinhood: {
      url:
        process.env.RPC_URL || "",
      accounts:
        process.env.PRIVATE_KEY
          ? [process.env.PRIVATE_KEY]
          : []
    }
  }
};

export default config;
