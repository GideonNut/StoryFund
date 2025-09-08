import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";

export const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "email", "phone"],
    },
  }),
  createWallet(),
  createWallet(),
  createWallet(),
  createWallet(),
  createWallet(),
];
