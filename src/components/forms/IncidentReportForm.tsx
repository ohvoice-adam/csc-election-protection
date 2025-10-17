import React, { useEffect, useState } from 'react';
import { SendIcon, AlertTriangleIcon, SearchIcon } from 'lucide-react';
// Sample polling locations for dropdown
const pollingLocations = [{
  id: 1,
  name: 'Fairfax High School',
  address: '3501 Lion Run, Fairfax, VA 22030'
}, {
  id: 2,
  name: 'Arlington Community Center',
  address: '5115 Arlington Blvd, Arlington, VA 22204'
}, {
  id: 3,
  name: 'Alexandria City Hall',
  address: '301 King St, Alexandria, VA 22314'
}, {
  id: 4,
  name: 'Loudoun County High School',
  address: '415 Dry Mill Rd SW, Leesburg, VA 20175'
}, {
  id: 5,
  name: 'Prince William Library',
  address: '9750 Liberia Ave, Manassas, VA 20110'
}, {
  id: 6,
  name: 'Henrico Recreation Center',
  address: '8301 Hungary Spring Rd, Henrico, VA 23228'
}, {
  id: 7,
  name: 'Chesterfield Elementary School',
  address: '9601 Krause Rd, Chesterfield, VA 23832'
}, {
  id: 8,
  name: 'Richmond Convention Center',
  address: '403 N 3rd St, Richmond, VA 23219'
}, {
  id: 9,
  name: 'Virginia Beach Civic Center',
  address: '2100 Parks Ave, Virginia Beach, VA 23451'
}, {
  id: 10,
  name: 'Norfolk State University',
  address: '700 Park Ave, Norfolk, VA 23504'
}];
// Incident types
const incidentTypes = ['Long Line', 'Aggressive Electioneering', 'Intimidation', 'Not Accessible', 'Not Enough Poll Workers', 'Early Voting', 'Official Poll Workers', 'Provisional Ballots', 'Registration', 'Vote Counting Site', 'Voter ID Related', 'Equipment Issues'];
const IncidentReportForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pollingLocationId: '',
    incidentType: '',
    message: '',
    verificationCode: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(pollingLocations);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    id: number;
    name: string;
    address: string;
  } | null>(null);
  // Filter locations based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredLocations(pollingLocations);
      return;
    }
    const filtered = pollingLocations.filter(location => location.name.toLowerCase().includes(searchTerm.toLowerCase()) || location.address.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredLocations(filtered);
  }, [searchTerm]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleLocationSelect = (location: {
    id: number;
    name: string;
    address: string;
  }) => {
    setSelectedLocation(location);
    setFormData({
      ...formData,
      pollingLocationId: location.id.toString()
    });
    setSearchTerm(location.name);
    setShowLocationDropdown(false);
  };
  const handleSearchFocus = () => {
    setShowLocationDropdown(true);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocation) {
      alert('Please select a polling location from the dropdown');
      return;
    }
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      // For demo purposes, we'll accept any verification code that's 6 digits
      if (/^\d{6}$/.test(formData.verificationCode)) {
        setSubmitted(true);
        setVerificationError('');
      } else {
        setVerificationError('Please enter a valid 6-digit verification code');
      }
      setIsVerifying(false);
    }, 1000);
  };
  return <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Report an Incident
      </h2>
      <p className="text-gray-600 mb-6">
        Submit a report about active issues at polling locations such as long
        lines, intimidation, or other election-related incidents.
      </p>
      {submitted ? <div className="p-4 rounded-md bg-[#2e4211] bg-opacity-10">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-[#2e4211]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-[#2e4211]">
                Incident report submitted successfully
              </h3>
              <div className="mt-2 text-sm text-[#4f681c]">
                <p>
                  Thank you for your report. Our team will review it and take
                  appropriate action.
                </p>
                <p className="mt-2">
                  Reference number:{' '}
                  <strong>
                    IR-{Math.floor(100000 + Math.random() * 900000)}
                  </strong>
                </p>
              </div>
              <div className="mt-4">
                <button type="button" onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                phone: '',
                email: '',
                pollingLocationId: '',
                incidentType: '',
                message: '',
                verificationCode: ''
              });
              setSelectedLocation(null);
              setSearchTerm('');
            }} className="text-sm font-medium text-[#4f681c] hover:text-[#2e4211]">
                  Submit another report
                </button>
              </div>
            </div>
          </div>
        </div> : <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input type="text" name="name" id="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input type="tel" name="phone" id="phone" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" name="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="pollingLocation" className="block text-sm font-medium text-gray-700">
              Polling Location
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" id="pollingLocation" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Search for polling location..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onFocus={handleSearchFocus} required />
              {showLocationDropdown && <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto max-h-60 focus:outline-none sm:text-sm">
                  {filteredLocations.length === 0 ? <div className="text-gray-500 px-4 py-2">
                      No locations found
                    </div> : filteredLocations.map(location => <div key={location.id} className="cursor-pointer hover:bg-gray-100 px-4 py-2" onClick={() => handleLocationSelect(location)}>
                        <div className="font-medium">{location.name}</div>
                        <div className="text-xs text-gray-500">
                          {location.address}
                        </div>
                      </div>)}
                </div>}
            </div>
            {selectedLocation && <p className="mt-1 text-sm text-gray-500">
                Selected: {selectedLocation.name}, {selectedLocation.address}
              </p>}
          </div>
          <div>
            <label htmlFor="incidentType" className="block text-sm font-medium text-gray-700">
              Incident Type
            </label>
            <select name="incidentType" id="incidentType" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.incidentType} onChange={handleChange} required>
              <option value="">Select an issue type</option>
              {incidentTypes.map(type => <option key={type} value={type}>
                  {type}
                </option>)}
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea name="message" id="message" rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.message} onChange={handleChange} required placeholder="Please provide details about the incident..."></textarea>
          </div>
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input type="text" name="verificationCode" id="verificationCode" className={`block w-full border ${verificationError ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`} value={formData.verificationCode} onChange={handleChange} required pattern="\d{6}" title="6-digit verification code" placeholder="Enter 6-digit code" />
              {verificationError && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <AlertTriangleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>}
            </div>
            {verificationError && <p className="mt-2 text-sm text-red-600">{verificationError}</p>}
            <p className="mt-1 text-xs text-gray-500">
              For demo purposes, enter any 6-digit number
            </p>
          </div>
          <div>
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#235280] hover:bg-[#1e456e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235280]" disabled={isVerifying}>
              {isVerifying ? <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </> : <>
                  <SendIcon className="h-4 w-4 mr-2" />
                  Submit Report
                </>}
            </button>
          </div>
        </form>}
      <div className="border-t border-gray-200 pt-4">
        <div className="rounded-md bg-[#235280] bg-opacity-10 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangleIcon className="h-5 w-5 text-[#235280]" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-[#235280]">
                Important Note
              </h3>
              <div className="mt-2 text-sm text-[#235280]">
                <p>
                  This form is for reporting active issues at polling locations.
                  If you're an Election Protection Volunteer arriving at a
                  polling location, please use the "Status Check" form instead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default IncidentReportForm;