import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchSection from '../components/sections/SearchSection';
import IncidentReportSection from '../components/sections/IncidentReportSection';
import AdminSection from '../components/sections/AdminSection';
import PollingLocationsSection from '../components/sections/PollingLocationsSection';
const HomePage: React.FC = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Votifi Dashboard
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Track and respond to voter barriers in real-time
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <SearchSection />
              <IncidentReportSection />
              <AdminSection />
              <PollingLocationsSection />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default HomePage;