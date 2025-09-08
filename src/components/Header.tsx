import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { client } from "@/lib/client";

const wallets = [
  inAppWallet(),
  createWallet(),
  createWallet(),
  createWallet(),
];

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">StoryFund</h1>
            <span className="text-sm text-gray-500">Greenlight Vault</span>
          </div>
          <ConnectButton 
            client={client} 
            wallets={wallets}
            connectModal={{
              showThirdwebBranding: false,
              size: "compact",
              title: "Connect to StoryFund",
              titleIcon: "",
            }}
          />
        </div>
      </div>
    </header>
  );
}