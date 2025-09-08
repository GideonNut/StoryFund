import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Project {
  id: number;
  creator: string;
  title: string;
  metadata: string;
  goal: string;
  deadline: string;
  totalStaked: string;
  finalized: boolean;
  greenlit: boolean;
}

interface StakeModalProps {
  project: Project;
  onClose: () => void;
  onStake: (amount: string) => void;
  isStaking: boolean;
}

export const StakeModal: React.FC<StakeModalProps> = ({ 
  project, 
  onClose, 
  onStake, 
  isStaking 
}) => {
  const [amount, setAmount] = useState('');
  const goalEth = (Number(project.goal) / 1e18).toFixed(4);
  const stakedEth = (Number(project.totalStaked) / 1e18).toFixed(4);
  const remainingEth = (Number(project.goal) - Number(project.totalStaked)) / 1e18;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && Number(amount) > 0) {
      onStake(amount);
    }
  };

  return (
    <Transition appear show={true} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Stake ETH for "{project.title}"
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Project Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Goal:</span>
                        <span className="font-medium">{goalEth} ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Staked:</span>
                        <span className="font-medium">{stakedEth} ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Remaining:</span>
                        <span className="font-medium">{remainingEth.toFixed(4)} ETH</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                        Amount to Stake (ETH)
                      </label>
                      <input
                        type="number"
                        id="amount"
                        step="0.001"
                        min="0"
                        max={remainingEth}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0.0"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum: {remainingEth.toFixed(4)} ETH
                      </p>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isStaking || !amount || Number(amount) <= 0}
                        className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isStaking ? 'Staking...' : `Stake ${amount || '0'} ETH`}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> You can unstake your funds after the project deadline if it doesn't reach its goal.
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
