import React, { useState } from 'react';
import { MessageSquareIcon, DatabaseIcon, SendIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, FilterIcon, UsersIcon, XIcon, SlashIcon } from 'lucide-react';
import VoterExportModal from '../integrations/VoterExportModal';
interface ExportTabProps {
  pollingPlace: any;
  precinctData?: any;
}
const ExportTab: React.FC<ExportTabProps> = ({
  pollingPlace,
  precinctData
}) => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [exportScope, setExportScope] = useState<'all' | 'precinct'>('all');
  const [selectedPrecinct, setSelectedPrecinct] = useState<string | null>(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  // Filter state
  const [filters, setFilters] = useState({
    eligibilityScore: [0, 100],
    status: ['at-risk'],
    race: [] as string[],
    gender: [] as string[],
    ageGroups: [] as string[],
    lastContactDays: null as number | null
  });
  // Available filter options
  const raceOptions = ['White', 'Black', 'Hispanic', 'Asian', 'Other'];
  const genderOptions = ['Male', 'Female', 'Non-binary', 'Other'];
  const ageGroupOptions = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
  const statusOptions = ['at-risk', 'eligible'];
  // Active filters count
  const activeFiltersCount = (filters.eligibilityScore[0] > 0 || filters.eligibilityScore[1] < 100 ? 1 : 0) + filters.status.length + filters.race.length + filters.gender.length + filters.ageGroups.length + (filters.lastContactDays ? 1 : 0);
  // Mock integrations data - in a real app, this would come from a context or API
  const integrations = [{
    id: 'ngpvan',
    name: 'NGP VAN',
    description: 'Export voter data to NGP VAN for canvassing and phone banking',
    icon: <DatabaseIcon className="h-6 w-6 text-blue-500" />,
    category: 'voter-data'
  }, {
    id: 'spoke',
    name: 'Spoke',
    description: 'Send text messages to affected voters via Spoke',
    icon: <MessageSquareIcon className="h-6 w-6 text-green-500" />,
    category: 'messaging'
  }, {
    id: 'hustle',
    name: 'Hustle',
    description: 'Send targeted text messages via Hustle platform',
    icon: <MessageSquareIcon className="h-6 w-6 text-purple-500" />,
    category: 'messaging'
  }, {
    id: 'scaletowin',
    name: 'Scale to Win',
    description: 'Export contacts for phone banking and texting campaigns',
    icon: <SendIcon className="h-6 w-6 text-red-500" />,
    category: 'messaging'
  }, {
    id: 'bigquery',
    name: 'Big Query',
    description: 'Export data for analysis in Google BigQuery',
    icon: <DatabaseIcon className="h-6 w-6 text-yellow-500" />,
    category: 'data-analytics'
  }];
  // Handle selecting an integration to export to
  const handleExportTo = (integrationId: string) => {
    setSelectedIntegration(integrationId);
    setShowExportModal(true);
  };
  // Toggle selection in a multi-select array
  const toggleSelection = (array: string[], value: string) => {
    if (array.includes(value)) {
      return array.filter(item => item !== value);
    } else {
      return [...array, value];
    }
  };
  // Handle filter changes
  const handleFilterChange = (filterType: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  // Remove a specific filter
  const removeFilter = (filterType: string, value?: string) => {
    if (filterType === 'eligibilityScore') {
      setFilters(prev => ({
        ...prev,
        eligibilityScore: [0, 100]
      }));
    } else if (value) {
      // Remove specific value from array filter
      setFilters(prev => ({
        ...prev,
        [filterType]: prev[filterType].filter(item => item !== value)
      }));
    } else {
      // Clear entire filter
      setFilters(prev => ({
        ...prev,
        [filterType]: []
      }));
    }
  };
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      eligibilityScore: [0, 100],
      status: [],
      race: [],
      gender: [],
      ageGroups: [],
      lastContactDays: null
    });
  };
  // Format eligibility score for display
  const formatEligibilityScore = (score: number) => {
    return `${score}%`;
  };
  return <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Export Voter Data
        </h2>
        <p className="text-gray-600 mb-6">
          Export voter data for this polling location to third-party services
          for outreach and analysis.
        </p>
      </div>
      {/* Export Scope Selection */}
      <div className="bg-white p-4 border border-gray-200 rounded-lg mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Select Export Scope
        </h3>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex items-center">
            <input type="radio" id="scope-all" name="export-scope" className="h-4 w-4 text-[#235280] focus:ring-[#235280] border-gray-300" checked={exportScope === 'all'} onChange={() => setExportScope('all')} />
            <label htmlFor="scope-all" className="ml-2 block text-sm text-gray-700">
              Entire Polling Location ({pollingPlace?.precincts?.length || 0}{' '}
              precincts)
            </label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="scope-precinct" name="export-scope" className="h-4 w-4 text-[#235280] focus:ring-[#235280] border-gray-300" checked={exportScope === 'precinct'} onChange={() => setExportScope('precinct')} />
            <label htmlFor="scope-precinct" className="ml-2 block text-sm text-gray-700">
              Specific Precinct
            </label>
          </div>
        </div>
        {exportScope === 'precinct' && pollingPlace?.precincts && <div className="mt-3">
            <label htmlFor="precinct-select" className="block text-sm font-medium text-gray-700 mb-1">
              Select Precinct
            </label>
            <select id="precinct-select" className="block w-full md:w-1/2 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" value={selectedPrecinct || ''} onChange={e => setSelectedPrecinct(e.target.value)}>
              <option value="">Select a precinct...</option>
              {pollingPlace.precincts.map(precinct => <option key={precinct.id} value={precinct.id}>
                  {precinct.name}{' '}
                  {precinct.recentlyChanged && '(Recently Changed)'}
                </option>)}
            </select>
          </div>}
        {exportScope === 'precinct' && !selectedPrecinct && <div className="mt-2 text-sm text-red-600">
            Please select a precinct to continue
          </div>}
      </div>
      {/* Voter Filters */}
      <div className="bg-white p-4 border border-gray-200 rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Voter Filters</h3>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235280]" onClick={() => setShowFilterPanel(!showFilterPanel)}>
            <FilterIcon className="h-4 w-4 mr-2" />
            {showFilterPanel ? 'Hide Filters' : 'Show Filters'}
            {showFilterPanel ? <ChevronUpIcon className="h-4 w-4 ml-1" /> : <ChevronDownIcon className="h-4 w-4 ml-1" />}
          </button>
        </div>
        {showFilterPanel && <div className="mb-4 space-y-6 border-b border-gray-200 pb-6">
            {/* Eligibility Score Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Eligibility Score Range
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-500">
                    {filters.eligibilityScore[0]}%
                  </span>
                  <span className="text-xs font-medium text-gray-500">
                    {filters.eligibilityScore[1]}%
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <input type="range" min="0" max="100" value={filters.eligibilityScore[0]} onChange={e => {
                const value = parseInt(e.target.value);
                if (value <= filters.eligibilityScore[1]) {
                  handleFilterChange('eligibilityScore', [value, filters.eligibilityScore[1]]);
                }
              }} className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer" />
                  <input type="range" min="0" max="100" value={filters.eligibilityScore[1]} onChange={e => {
                const value = parseInt(e.target.value);
                if (value >= filters.eligibilityScore[0]) {
                  handleFilterChange('eligibilityScore', [filters.eligibilityScore[0], value]);
                }
              }} className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Min: {filters.eligibilityScore[0]}%</span>
                  <span>Max: {filters.eligibilityScore[1]}%</span>
                </div>
              </div>
            </div>
            {/* Voter Status Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Voter Status
              </h4>
              <div className="flex flex-wrap gap-3">
                {statusOptions.map(status => <label key={status} className="inline-flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-[#235280] focus:ring-[#235280] border-gray-300 rounded" checked={filters.status.includes(status)} onChange={() => {
                handleFilterChange('status', toggleSelection(filters.status, status));
              }} />
                    <span className="ml-2 text-sm text-gray-700">
                      {status === 'at-risk' ? 'At-Risk Voters' : 'Eligible Voters'}
                    </span>
                  </label>)}
              </div>
            </div>
            {/* Race/Ethnicity Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Race/Ethnicity
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {raceOptions.map(race => <label key={race} className="inline-flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-[#235280] focus:ring-[#235280] border-gray-300 rounded" checked={filters.race.includes(race)} onChange={() => {
                handleFilterChange('race', toggleSelection(filters.race, race));
              }} />
                    <span className="ml-2 text-sm text-gray-700">{race}</span>
                  </label>)}
              </div>
            </div>
            {/* Gender Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Gender</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {genderOptions.map(gender => <label key={gender} className="inline-flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-[#235280] focus:ring-[#235280] border-gray-300 rounded" checked={filters.gender.includes(gender)} onChange={() => {
                handleFilterChange('gender', toggleSelection(filters.gender, gender));
              }} />
                    <span className="ml-2 text-sm text-gray-700">{gender}</span>
                  </label>)}
              </div>
            </div>
            {/* Age Group Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Age Group
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ageGroupOptions.map(ageGroup => <label key={ageGroup} className="inline-flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-[#235280] focus:ring-[#235280] border-gray-300 rounded" checked={filters.ageGroups.includes(ageGroup)} onChange={() => {
                handleFilterChange('ageGroups', toggleSelection(filters.ageGroups, ageGroup));
              }} />
                    <span className="ml-2 text-sm text-gray-700">
                      {ageGroup}
                    </span>
                  </label>)}
              </div>
            </div>
            {/* Last Contact Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Last Contact
              </h4>
              <div className="flex items-center space-x-3">
                <select className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" value={filters.lastContactDays || ''} onChange={e => {
              const value = e.target.value ? parseInt(e.target.value) : null;
              handleFilterChange('lastContactDays', value);
            }}>
                  <option value="">Any time</option>
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                  <option value="180">Last 180 days</option>
                  <option value="365">Last year</option>
                </select>
              </div>
            </div>
            {/* Filter Actions */}
            <div className="flex justify-end pt-2">
              <button onClick={resetFilters} className="px-4 py-2 text-sm font-medium rounded-md transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300">
                Reset All Filters
              </button>
            </div>
          </div>}
        {/* Active Filters Display */}
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium text-gray-700">
              Applied Filters:{' '}
              {activeFiltersCount > 0 ? activeFiltersCount : 'None'}
            </div>
            {activeFiltersCount > 0 && <button className="text-xs text-blue-600 hover:text-blue-800" onClick={resetFilters}>
                Clear All
              </button>}
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Eligibility Score Filter */}
            {(filters.eligibilityScore[0] > 0 || filters.eligibilityScore[1] < 100) && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Eligibility Score: {filters.eligibilityScore[0]}% -{' '}
                {filters.eligibilityScore[1]}%
                <button className="ml-1 text-blue-600 hover:text-blue-800" onClick={() => removeFilter('eligibilityScore')}>
                  ×
                </button>
              </span>}
            {/* Status Filters */}
            {filters.status.map(status => <span key={status} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Status:{' '}
                {status === 'at-risk' ? 'At-Risk Voters' : 'Eligible Voters'}
                <button className="ml-1 text-blue-600 hover:text-blue-800" onClick={() => removeFilter('status', status)}>
                  ×
                </button>
              </span>)}
            {/* Race Filters */}
            {filters.race.map(race => <span key={race} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Race: {race}
                <button className="ml-1 text-purple-600 hover:text-purple-800" onClick={() => removeFilter('race', race)}>
                  ×
                </button>
              </span>)}
            {/* Gender Filters */}
            {filters.gender.map(gender => <span key={gender} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Gender: {gender}
                <button className="ml-1 text-green-600 hover:text-green-800" onClick={() => removeFilter('gender', gender)}>
                  ×
                </button>
              </span>)}
            {/* Age Group Filters */}
            {filters.ageGroups.map(ageGroup => <span key={ageGroup} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Age: {ageGroup}
                <button className="ml-1 text-yellow-600 hover:text-yellow-800" onClick={() => removeFilter('ageGroups', ageGroup)}>
                  ×
                </button>
              </span>)}
            {/* Last Contact Filter */}
            {filters.lastContactDays && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Last Contact: Last {filters.lastContactDays} days
                <button className="ml-1 text-red-600 hover:text-red-800" onClick={() => handleFilterChange('lastContactDays', null)}>
                  ×
                </button>
              </span>}
            {activeFiltersCount === 0 && <span className="text-xs text-gray-500 italic">
                No filters applied - all voters will be included
              </span>}
          </div>
        </div>
      </div>
      {/* Available Integrations */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Available Integrations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map(integration => <div key={integration.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">{integration.icon}</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">
                      {integration.name}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {integration.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#235280] hover:bg-[#1e456e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235280]" onClick={() => handleExportTo(integration.id)} disabled={exportScope === 'precinct' && !selectedPrecinct}>
                    Export to {integration.name}
                  </button>
                </div>
              </div>
            </div>)}
        </div>
      </div>
      {/* Recent Exports */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-5">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Exports
          </h3>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200">
              <li className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Exported 156 voters to Spoke
                      </p>
                      <p className="text-xs text-gray-500">
                        For polling location change notification
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </li>
              <li className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Exported 89 voters to NGP VAN
                      </p>
                      <p className="text-xs text-gray-500">
                        Fairfax North Precinct
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Yesterday</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Export Modal */}
      {showExportModal && <VoterExportModal integration={integrations.find(i => i.id === selectedIntegration) || null} onClose={() => setShowExportModal(false)} />}
    </div>;
};
export default ExportTab;