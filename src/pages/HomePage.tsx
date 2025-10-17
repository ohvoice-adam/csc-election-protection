import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IncidentReportForm from '../components/forms/IncidentReportForm';
import StatusCheckForm from '../components/forms/StatusCheckForm';
import { AlertTriangleIcon, ClipboardCheckIcon } from 'lucide-react';
const HomePage: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<'incident' | 'status' | null>(null);
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Election Protection
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Help ensure fair and accessible elections by reporting issues or
                checking polling location status
              </p>
            </div>
            {!selectedForm ? <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  What would you like to do?
                </h2>
                <p className="text-gray-600 mb-6">
                  Please select one of the options below to continue.
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div onClick={() => setSelectedForm('incident')} className="border rounded-lg p-6 hover:bg-blue-50 cursor-pointer transition-colors flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                      <AlertTriangleIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Report an Incident
                    </h3>
                    <p className="text-gray-500">
                      Submit a report about active issues at polling locations
                      such as long lines, intimidation, or other
                      election-related incidents.
                    </p>
                  </div>
                  <div onClick={() => setSelectedForm('status')} className="border rounded-lg p-6 hover:bg-blue-50 cursor-pointer transition-colors flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <ClipboardCheckIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Polling Location Status Check
                    </h3>
                    <p className="text-gray-500">
                      For Election Protection Volunteers arriving at a polling
                      location. Complete this form to report on the current
                      conditions.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    If you're an election official or need additional
                    assistance, please contact our hotline at{' '}
                    <span className="font-medium">1-866-OUR-VOTE</span>.
                  </p>
                </div>
              </div> : <div className="mb-6">
                <button onClick={() => setSelectedForm(null)} className="mb-4 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  ← Back to selection
                </button>
                {selectedForm === 'incident' ? <IncidentReportForm /> : <StatusCheckForm />}
              </div>}
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default HomePage;