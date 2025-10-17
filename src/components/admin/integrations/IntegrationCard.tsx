import React from 'react';
import { CheckCircleIcon, XCircleIcon, ExternalLinkIcon } from 'lucide-react';
interface IntegrationCardProps {
  integration: {
    id: string;
    name: string;
    description: string;
    status: string;
    lastSync: string | null;
    icon: React.ReactNode;
    category: string;
    features: string[];
    buttonText: string;
  };
  onAction: () => void;
}
const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
  onAction
}) => {
  const isConnected = integration.status === 'connected';
  // Format last sync time
  const formatLastSync = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };
  return <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            {integration.icon}
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">
                {integration.name}
              </h3>
              <div className="flex items-center mt-1">
                {isConnected ? <span className="flex items-center text-sm text-green-600">
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    Connected
                  </span> : <span className="flex items-center text-sm text-gray-500">
                    <XCircleIcon className="h-4 w-4 mr-1" />
                    Disconnected
                  </span>}
                {isConnected && <span className="text-xs text-gray-500 ml-3">
                    Last sync: {formatLastSync(integration.lastSync)}
                  </span>}
              </div>
            </div>
          </div>
          <a href="#" className="text-gray-400 hover:text-gray-500" title="Open documentation">
            <ExternalLinkIcon className="h-5 w-5" />
          </a>
        </div>
        <p className="mt-3 text-sm text-gray-500">{integration.description}</p>
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">Features:</h4>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
            {integration.features.map((feature, index) => <li key={index} className="text-xs text-gray-600 flex items-center">
                <CheckCircleIcon className="h-3 w-3 text-green-500 mr-1" />
                {feature}
              </li>)}
          </ul>
        </div>
        <div className="mt-5">
          <button type="button" onClick={onAction} className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${isConnected ? 'bg-[#235280] hover:bg-[#1e456e]' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235280]`}>
            {integration.buttonText}
          </button>
          {isConnected && <button type="button" className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235280]">
              Settings
            </button>}
        </div>
      </div>
    </div>;
};
export default IntegrationCard;