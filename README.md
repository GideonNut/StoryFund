# StoryFund - Greenlight Vault

A Next.js frontend for the StoryFund Greenlight Vault smart contract, built with Thirdweb v5 and Base network.

## Features

- 🔗 **Wallet Connection**: Connect with MetaMask, Coinbase Wallet, Rainbow, and more
- 🚀 **Create Projects**: Creators can launch funding campaigns
- 💰 **Stake ETH**: Supporters can stake ETH to fund projects
- 📊 **Real-time Stats**: View project progress and funding status
- ⏰ **Deadline Management**: Projects have time-limited funding periods
- 🔄 **Unstaking**: Get funds back if project doesn't reach goal

## Contract Address

```
0x9CBd1C1866f6779a68BF2e1AC35D77b19366fF05
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your-thirdweb-client-id
NEXT_PUBLIC_THIRDWEB_SECRET_KEY=your-thirdweb-secret-key
NEXT_PUBLIC_CONTRACT_ADDRESS=0x9CBd1C1866f6779a68BF2e1AC35D77b19366fF05
NEXT_PUBLIC_CHAIN_ID=8453
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. **Connect Wallet**: Click "Connect" to connect your Web3 wallet
2. **Create Project**: Fill out the form to create a new funding campaign
3. **Stake ETH**: Click "Stake ETH" on any active project to support it
4. **Finalize**: After deadline, finalize projects to determine if they're greenlit
5. **Unstake**: If projects don't reach their goal, supporters can unstake their funds

## Technologies Used

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Thirdweb v5 SDK
- Base Network (Ethereum L2)
- Ethers.js

## Smart Contract Functions

- `createProject(title, metadata, goal, duration)` - Create a new project
- `stake(projectId)` - Stake ETH to support a project
- `unstake(projectId)` - Unstake funds after deadline
- `finalizeProject(projectId)` - Finalize project and determine if greenlit

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Main page
├── components/
│   ├── Header.tsx          # Header with ConnectButton
│   ├── ProjectList.tsx     # List of all projects
│   ├── ProjectCard.tsx     # Individual project card
│   └── CreateProject.tsx   # Create new project form
└── lib/
    ├── client.ts           # Thirdweb client configuration
    └── wallets.ts          # Wallet configurations
```