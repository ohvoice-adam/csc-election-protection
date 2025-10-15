import React, { useState } from 'react';
import { CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
const VoterEligibilitySection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    zipCode: ''
  });
  const [eligibilityStatus, setEligibilityStatus] = useState<null | boolean>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would check against a database
    // For demo purposes, we'll just simulate a response
    setEligibilityStatus(true);
  };
  return <section id="voter-eligibility" className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Voter Eligibility
      </h2>
      <p className="text-gray-600 mb-6">
        Check if a voter is eligible to vote and get information about their
        polling location.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input type="text" name="fullName" id="fullName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input type="date" name="dateOfBirth" id="dateOfBirth" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.dateOfBirth} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Residential Address
          </label>
          <input type="text" name="address" id="address" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            ZIP Code
          </label>
          <input type="text" name="zipCode" id="zipCode" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.zipCode} onChange={handleChange} required pattern="[0-9]{5}" title="Five digit zip code" />
        </div>
        <div>
          <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Check Eligibility
          </button>
        </div>
      </form>
      {eligibilityStatus !== null && <div className={`p-4 rounded-md ${eligibilityStatus ? 'bg-green-50' : 'bg-red-50'}`}>
          {eligibilityStatus ? <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Eligible to vote
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    This voter is registered and eligible to vote in the
                    upcoming election.
                  </p>
                  <p className="mt-1">
                    <strong>Polling Location:</strong> Central High School, 1234
                    Main St
                  </p>
                  <p>
                    <strong>Voting Hours:</strong> 7:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </div> : <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Not eligible to vote
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    This voter is not currently registered to vote in this
                    jurisdiction.
                  </p>
                  <p className="mt-2">
                    Please contact your local election office for more
                    information.
                  </p>
                </div>
              </div>
            </div>}
        </div>}
    </section>;
};
export default VoterEligibilitySection;