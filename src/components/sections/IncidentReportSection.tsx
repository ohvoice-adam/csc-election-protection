import React, { useState } from 'react';
import { CheckCircleIcon, SendIcon, AlertTriangleIcon } from 'lucide-react';
type IncidentSubject = 'Not Accessible' | 'Not Enough Poll Workers' | 'Early Voting' | 'Official Poll Workers' | 'Provisional Ballots' | 'Registration' | 'Vote Counting Site' | 'Voter ID Related' | 'Equipment Issues';
const IncidentReportSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    pollingLocation: '',
    subject: '' as IncidentSubject,
    message: '',
    verificationCode: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
  const incidentSubjects: IncidentSubject[] = ['Not Accessible', 'Not Enough Poll Workers', 'Early Voting', 'Official Poll Workers', 'Provisional Ballots', 'Registration', 'Vote Counting Site', 'Voter ID Related', 'Equipment Issues'];
  return <section id="incident-report" className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Report an Incident
      </h2>
      <p className="text-gray-600 mb-6">
        Submit a report about issues at polling locations or other
        election-related incidents.
      </p>
      {submitted ? <div className="p-4 rounded-md bg-[#2e4211] bg-opacity-10">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-[#2e4211]" aria-hidden="true" />
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
                pollingLocation: '',
                subject: '' as IncidentSubject,
                message: '',
                verificationCode: ''
              });
            }} className="text-sm font-medium text-[#4f681c] hover:text-[#2e4211]">
                  Submit another report
                </button>
              </div>
            </div>
          </div>
        </div> : <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input type="text" name="name" id="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="pollingLocation" className="block text-sm font-medium text-gray-700">
              Polling Location
            </label>
            <input type="text" name="pollingLocation" id="pollingLocation" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" value={formData.pollingLocation} onChange={handleChange} required placeholder="Name and address of polling location" />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <select name="subject" id="subject" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" value={formData.subject} onChange={handleChange} required>
              <option value="">Select an issue type</option>
              {incidentSubjects.map(subject => <option key={subject} value={subject}>
                  {subject}
                </option>)}
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea name="message" id="message" rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" value={formData.message} onChange={handleChange} required placeholder="Please provide details about the incident..."></textarea>
          </div>
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input type="text" name="verificationCode" id="verificationCode" className={`block w-full border ${verificationError ? 'border-[#803e5f]' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm`} value={formData.verificationCode} onChange={handleChange} required pattern="\d{6}" title="6-digit verification code" placeholder="Enter 6-digit code" />
              {verificationError && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <AlertTriangleIcon className="h-5 w-5 text-[#803e5f]" aria-hidden="true" />
                </div>}
            </div>
            {verificationError && <p className="mt-2 text-sm text-[#803e5f]">{verificationError}</p>}
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
    </section>;
};
export default IncidentReportSection;