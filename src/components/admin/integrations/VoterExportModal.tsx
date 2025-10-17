import React, { useState } from 'react';
import { XIcon, SearchIcon, FilterIcon, CheckIcon, AlertTriangleIcon, MapPinIcon, UserIcon, SendIcon } from 'lucide-react';
interface VoterExportModalProps {
  integration: {
    id: string;
    name: string;
    icon: React.ReactNode;
  } | null;
  onClose: () => void;
}
const VoterExportModal: React.FC<VoterExportModalProps> = ({
  integration,
  onClose
}) => {
  const [step, setStep] = useState<'search' | 'review' | 'success'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    incident: '',
    location: '',
    status: 'at-risk',
    eligibilityScore: [0.5, 1]
  });
  const [selectedVoters, setSelectedVoters] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [messageTemplate, setMessageTemplate] = useState('');
  // Mock voter data
  const mockVoters = [{
    id: '1',
    name: 'John Smith',
    phone: '(703) 555-1234',
    location: 'Fairfax County',
    precinct: 'Fairfax Central',
    eligibilityScore: 0.45,
    status: 'at-risk',
    lastContact: '2023-09-15'
  }, {
    id: '2',
    name: 'Maria Rodriguez',
    phone: '(571) 555-2345',
    location: 'Arlington County',
    precinct: 'Arlington Heights',
    eligibilityScore: 0.38,
    status: 'at-risk',
    lastContact: '2023-09-20'
  }, {
    id: '3',
    name: 'David Johnson',
    phone: '(804) 555-3456',
    location: 'Richmond City',
    precinct: 'Richmond Downtown',
    eligibilityScore: 0.42,
    status: 'at-risk',
    lastContact: '2023-09-18'
  }, {
    id: '4',
    name: 'Sarah Williams',
    phone: '(757) 555-4567',
    location: 'Virginia Beach',
    precinct: 'Virginia Beach North',
    eligibilityScore: 0.51,
    status: 'eligible',
    lastContact: '2023-09-25'
  }, {
    id: '5',
    name: 'James Brown',
    phone: '(540) 555-5678',
    location: 'Roanoke',
    precinct: 'Roanoke Central',
    eligibilityScore: 0.48,
    status: 'at-risk',
    lastContact: '2023-09-22'
  }, {
    id: '6',
    name: 'Jennifer Lee',
    phone: '(434) 555-6789',
    location: 'Charlottesville',
    precinct: 'Charlottesville Downtown',
    eligibilityScore: 0.52,
    status: 'eligible',
    lastContact: '2023-09-17'
  }, {
    id: '7',
    name: 'Michael Davis',
    phone: '(276) 555-7890',
    location: 'Bristol',
    precinct: 'Bristol Central',
    eligibilityScore: 0.44,
    status: 'at-risk',
    lastContact: '2023-09-19'
  }, {
    id: '8',
    name: 'Lisa Garcia',
    phone: '(703) 555-8901',
    location: 'Fairfax County',
    precinct: 'Fairfax North',
    eligibilityScore: 0.39,
    status: 'at-risk',
    lastContact: '2023-09-21'
  }, {
    id: '9',
    name: 'Robert Taylor',
    phone: '(757) 555-9012',
    location: 'Norfolk',
    precinct: 'Norfolk Central',
    eligibilityScore: 0.41,
    status: 'at-risk',
    lastContact: '2023-09-16'
  }, {
    id: '10',
    name: 'Emily Wilson',
    phone: '(540) 555-0123',
    location: 'Harrisonburg',
    precinct: 'Harrisonburg Central',
    eligibilityScore: 0.47,
    status: 'at-risk',
    lastContact: '2023-09-24'
  }];
  // Filter voters based on search and filters
  const filteredVoters = mockVoters.filter(voter => {
    const matchesSearch = voter.name.toLowerCase().includes(searchQuery.toLowerCase()) || voter.location.toLowerCase().includes(searchQuery.toLowerCase()) || voter.precinct.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedFilters.status === 'all' || voter.status === selectedFilters.status;
    const matchesEligibility = voter.eligibilityScore >= selectedFilters.eligibilityScore[0] && voter.eligibilityScore <= selectedFilters.eligibilityScore[1];
    const matchesLocation = !selectedFilters.location || voter.location.includes(selectedFilters.location);
    return matchesSearch && matchesStatus && matchesEligibility && matchesLocation;
  });
  // Handle checkbox changes
  const handleSelectVoter = (voterId: string) => {
    if (selectedVoters.includes(voterId)) {
      setSelectedVoters(selectedVoters.filter(id => id !== voterId));
    } else {
      setSelectedVoters([...selectedVoters, voterId]);
    }
  };
  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedVoters([]);
    } else {
      setSelectedVoters(filteredVoters.map(voter => voter.id));
    }
    setSelectAll(!selectAll);
  };
  // Handle export to integration
  const handleExport = () => {
    if (step === 'search') {
      setStep('review');
    } else if (step === 'review') {
      // In a real app, this would make an API call to the integration
      setTimeout(() => {
        setStep('success');
      }, 1000);
    }
  };
  // Predefined message templates
  const messageTemplates = [{
    id: 'polling-change',
    name: 'Polling Location Change',
    template: 'IMPORTANT: Your polling location has changed. Please vote at [NEW LOCATION] on Election Day. Reply HELP for assistance or STOP to opt out.'
  }, {
    id: 'id-reminder',
    name: 'Voter ID Reminder',
    template: "REMINDER: Don't forget to bring valid ID to vote. Check votifi.org/id for acceptable forms of ID. Reply HELP for assistance or STOP to opt out."
  }, {
    id: 'hours-extended',
    name: 'Extended Hours Notice',
    template: 'ALERT: Polling hours at [LOCATION] have been extended until [TIME] due to earlier issues. You can still vote! Reply HELP for assistance or STOP to opt out.'
  }];
  return <div className="fixed inset-0 overflow-y-auto z-50">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                {integration?.icon && <span className="mr-2">{integration.icon}</span>}
                {step === 'success' ? 'Export Successful' : `Export Voters to ${integration?.name || 'Integration'}`}
              </h3>
              <button onClick={onClose} className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            {/* Step 1: Search and Filter */}
            {step === 'search' && <div className="mt-4">
                <div className="mb-5">
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-grow">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" placeholder="Search voters by name, location, or precinct..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                      </div>
                    </div>
                    <div className="flex">
                      <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235280]">
                        <FilterIcon className="h-4 w-4 mr-2" />
                        Filters
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Applied Filters:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Status: At-Risk Voters
                        <XIcon className="h-3 w-3 ml-1 cursor-pointer" />
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Eligibility Score: &lt; 50%
                        <XIcon className="h-3 w-3 ml-1 cursor-pointer" />
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Incident: Polling Location Change
                        <XIcon className="h-3 w-3 ml-1 cursor-pointer" />
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        County: Fairfax
                        <XIcon className="h-3 w-3 ml-1 cursor-pointer" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-[#235280] focus:ring-[#235280] border-gray-300 rounded" checked={selectAll} onChange={handleSelectAll} />
                            <span className="ml-2">Select All</span>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Voter
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Contact
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredVoters.map(voter => <tr key={voter.id} className={selectedVoters.includes(voter.id) ? 'bg-blue-50' : ''}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input type="checkbox" className="h-4 w-4 text-[#235280] focus:ring-[#235280] border-gray-300 rounded" checked={selectedVoters.includes(voter.id)} onChange={() => handleSelectVoter(voter.id)} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {voter.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {voter.phone}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {voter.location}
                            </div>
                            <div className="text-sm text-gray-500">
                              {voter.precinct}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {voter.status === 'at-risk' ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                At Risk (
                                {(voter.eligibilityScore * 100).toFixed(0)}%)
                              </span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Eligible (
                                {(voter.eligibilityScore * 100).toFixed(0)}%)
                              </span>}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {voter.lastContact}
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {selectedVoters.length} of {filteredVoters.length} voters
                    selected
                  </div>
                  <div>
                    <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235280] mr-3" onClick={onClose}>
                      Cancel
                    </button>
                    <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#235280] hover:bg-[#1e456e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235280]" onClick={handleExport} disabled={selectedVoters.length === 0}>
                      Continue
                    </button>
                  </div>
                </div>
              </div>}
            {/* Step 2: Review and Configure Message */}
            {step === 'review' && <div className="mt-4">
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <AlertTriangleIcon className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Rapid Response Campaign
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          You are about to send messages to{' '}
                          {selectedVoters.length} voters. Please review your
                          message template carefully before proceeding.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Campaign Details
                    </h4>
                    <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                      <div className="flex items-center mb-3">
                        <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium">
                            Affected Area
                          </div>
                          <div className="text-sm text-gray-500">
                            Fairfax County, Precinct 12
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center mb-3">
                        <AlertTriangleIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium">
                            Incident Type
                          </div>
                          <div className="text-sm text-gray-500">
                            Polling Location Change
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium">
                            Target Audience
                          </div>
                          <div className="text-sm text-gray-500">
                            {selectedVoters.length} at-risk voters
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Message Template
                    </h4>
                    <div className="mb-3">
                      <select className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" value={messageTemplate} onChange={e => {
                    setMessageTemplate(e.target.value);
                  }}>
                        <option value="">Select a template...</option>
                        {messageTemplates.map(template => <option key={template.id} value={template.template}>
                            {template.name}
                          </option>)}
                      </select>
                    </div>
                    <textarea rows={4} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" placeholder="Enter your message here..." value={messageTemplate} onChange={e => setMessageTemplate(e.target.value)}></textarea>
                    <div className="mt-2 text-xs text-gray-500">
                      <p>
                        Placeholders: [NEW LOCATION], [TIME], [LOCATION], etc.
                        will be replaced with actual data.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Recipients Preview (10 of {selectedVoters.length})
                  </h4>
                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockVoters.filter(voter => selectedVoters.includes(voter.id)).slice(0, 5).map(voter => <tr key={voter.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {voter.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {voter.phone}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {voter.location}, {voter.precinct}
                              </td>
                            </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mt-5 flex justify-between">
                  <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235280]" onClick={() => setStep('search')}>
                    Back
                  </button>
                  <div>
                    <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235280] mr-3" onClick={onClose}>
                      Cancel
                    </button>
                    <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#235280] hover:bg-[#1e456e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235280]" onClick={handleExport} disabled={!messageTemplate}>
                      <SendIcon className="h-4 w-4 mr-2" />
                      Send Campaign
                    </button>
                  </div>
                </div>
              </div>}
            {/* Step 3: Success */}
            {step === 'success' && <div className="mt-4 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckIcon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">
                  Export Successful!
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your campaign has been successfully sent to{' '}
                    {selectedVoters.length} voters via {integration?.name}.
                  </p>
                </div>
                <div className="mt-5 bg-gray-50 p-4 rounded-md border border-gray-200 text-left">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Campaign Summary
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex justify-between">
                      <span>Total Recipients:</span>
                      <span className="font-medium">
                        {selectedVoters.length}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Campaign Type:</span>
                      <span className="font-medium">
                        Rapid Response (Polling Location Change)
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sent Via:</span>
                      <span className="font-medium">{integration?.name}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Date & Time:</span>
                      <span className="font-medium">
                        {new Date().toLocaleString()}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="mt-5">
                  <button type="button" className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#235280] hover:bg-[#1e456e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235280]" onClick={onClose}>
                    Close
                  </button>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default VoterExportModal;