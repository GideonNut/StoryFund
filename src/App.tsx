import React from 'react';
import { ThirdwebProvider } from 'thirdweb/react';
import Header from './components/Header';

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              StoryFund
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Fund creative projects and help them get greenlit. Stake ETH to support projects you believe in.
            </p>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to StoryFund</h2>
              <p className="text-gray-600">
                Connect your wallet to start creating and funding projects!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThirdwebProvider>
      <AppContent />
    </ThirdwebProvider>
  );
}

export default App;
