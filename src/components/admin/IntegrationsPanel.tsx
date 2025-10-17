import React, { useState } from 'react';
import { ExternalLinkIcon, CheckCircleIcon, XCircleIcon, SearchIcon, RefreshCwIcon, DatabaseIcon, MessageSquareIcon, SettingsIcon, PlusCircleIcon } from 'lucide-react';
const IntegrationsPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'connected' | 'disconnected'>('all');
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  // Mock integrations data
  const integrations = [{
    id: 'ngpvan',
    name: 'NGP VAN',
    description: 'Voter file management and campaign management software',
    status: 'connected',
    lastSync: '2023-10-12T14:30:00Z',
    icon: <DatabaseIcon className="h-6 w-6 text-blue-500" />,
    category: 'voter-data',
    features: ['Voter file access', 'Canvassing', 'Phone banking', 'Event management']
  }, {
    id: 'spoke',
    name: 'Spoke',
    description: 'Peer-to-peer texting platform for campaigns and organizations',
    status: 'connected',
    lastSync: '2023-10-15T09:45:00Z',
    icon: <MessageSquareIcon className="h-6 w-6 text-green-500" />,
    category: 'messaging',
    features: ['P2P texting', 'Message templates', 'Opt-out management', 'Analytics']
  }, {
    id: 'hustle',
    name: 'Hustle',
    description: 'Text messaging platform for one-to-one conversations at scale',
    status: 'disconnected',
    lastSync: null,
    icon: <MessageSquareIcon className="h-6 w-6 text-purple-500" />,
    category: 'messaging',
    features: ['Bulk texting', 'Conversation management', 'Analytics', 'API access']
  }, {
    id: 'scaletowin',
    name: 'Scale to Win',
    description: 'Phone banking and texting platform for campaigns',
    status: 'connected',
    lastSync: '2023-10-10T16:20:00Z',
    icon: <MessageSquareIcon className="h-6 w-6 text-red-500" />,
    category: 'messaging',
    features: ['Phone banking', 'Texting', 'Volunteer management', 'Analytics']
  }, {
    id: 'bigquery',
    name: 'Big Query',
    description: 'Google Cloud data warehouse for storing and analyzing large datasets',
    status: 'connected',
    lastSync: '2023-10-14T08:15:00Z',
    icon: <DatabaseIcon className="h-6 w-6 text-yellow-500" />,
    category: 'data-analytics',
    features: ['Data storage', 'SQL queries', 'Data visualization', 'Machine learning']
  }];
  // Filter integrations based on search query and filter status
  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) || integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || filterStatus === 'connected' && integration.status === 'connected' || filterStatus === 'disconnected' && integration.status === 'disconnected';
    return matchesSearch && matchesStatus;
  });
  // Handle sync action
  const handleSyncIntegration = (integrationId: string) => {
    alert(`Syncing ${integrations.find(i => i.id === integrationId)?.name}...`);
    // In a real app, this would trigger a sync with the integration
  };
  // Handle connect/disconnect action
  const handleConnectionAction = (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId);
    if (integration?.status === 'disconnected') {
      // In a real app, this would open a connection flow
      alert(`Connect to ${integration.name} integration`);
    } else {
      // For connected integrations, open settings
      alert(`Open settings for ${integration?.name}`);
    }
  };
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage connections to third-party services for voter data and campaign
          management.
        </p>
      </div>
      {/* Admin Actions */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex-grow">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" placeholder="Search integrations..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select className="block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)}>
              <option value="all">All Statuses</option>
              <option value="connected">Connected</option>
              <option value="disconnected">Disconnected</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#235280] hover:bg-[#1e456e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235280]" onClick={() => setShowConnectionModal(true)}>
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Add Integration
            </button>
          </div>
        </div>
      </div>
      {/* Integrations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIntegrations.map(integration => <div key={integration.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  {integration.icon}
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {integration.name}
                    </h3>
                    <div className="flex items-center mt-1">
                      {integration.status === 'connected' ? <span className="flex items-center text-sm text-green-600">
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          Connected
                        </span> : <span className="flex items-center text-sm text-gray-500">
                          <XCircleIcon className="h-4 w-4 mr-1" />
                          Disconnected
                        </span>}
                      {integration.status === 'connected' && integration.lastSync && <span className="text-xs text-gray-500 ml-3">
                            Last sync:{' '}
                            {new Date(integration.lastSync).toLocaleString()}
                          </span>}
                    </div>
                  </div>
                </div>
                <a href="#" className="text-gray-400 hover:text-gray-500" title="View documentation">
                  <ExternalLinkIcon className="h-5 w-5" />
                </a>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                {integration.description}
              </p>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Features:</h4>
                <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                  {integration.features.map((feature, index) => <li key={index} className="text-xs text-gray-600 flex items-center">
                      <CheckCircleIcon className="h-3 w-3 text-green-500 mr-1" />
                      {feature}
                    </li>)}
                </ul>
              </div>
              <div className="mt-5 flex space-x-3">
                {integration.status === 'connected' ? <>
                    <button type="button" onClick={() => handleSyncIntegration(integration.id)} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235280]">
                      <RefreshCwIcon className="h-4 w-4 mr-2" />
                      Sync Now
                    </button>
                    <button type="button" onClick={() => handleConnectionAction(integration.id)} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235280]">
                      <SettingsIcon className="h-4 w-4 mr-2" />
                      Settings
                    </button>
                  </> : <button type="button" onClick={() => handleConnectionAction(integration.id)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    <PlusCircleIcon className="h-4 w-4 mr-2" />
                    Connect
                  </button>}
              </div>
            </div>
          </div>)}
      </div>
      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Integration Activity
          </h3>
          <div className="mt-4 flow-root">
            <ul className="divide-y divide-gray-200">
              <li className="py-3">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">
                        Synced with NGP VAN
                      </h3>
                      <p className="text-sm text-gray-500">2h ago</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Updated 2,345 voter records
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">
                        Connected to Spoke
                      </h3>
                      <p className="text-sm text-gray-500">5h ago</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      API key configured and connection tested successfully
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-3">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">
                        Synced with Big Query
                      </h3>
                      <p className="text-sm text-gray-500">1d ago</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Weekly voter eligibility analysis dataset
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>;
};
export default IntegrationsPanel;