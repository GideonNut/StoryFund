import { createThirdwebClient } from "thirdweb";
import { base } from "thirdweb/chains";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "your-client-id-here",
});

export const chain = base;

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x9CBd1C1866f6779a68BF2e1AC35D77b19366fF05";
