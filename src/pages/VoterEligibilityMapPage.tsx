import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatewideCensusHeatMap from '../components/maps/StatewideCensusHeatMap';
const VoterEligibilityMapPage: React.FC = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Virginia Voter Eligibility Analysis
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Precinct-level data showing voter eligibility scores and
                affected populations. Explore which areas have high or low voter
                eligibility rates.
              </p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <StatewideCensusHeatMap />
            </div>
            <div className="mt-8 bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                About This Data
              </h2>
              <p className="text-gray-600 mb-4">
                This precinct list displays voter eligibility scores across
                Virginia. Each precinct's data includes eligibility scores,
                total affected population, and the number of at-risk voters.
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                How to Use This List
              </h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>
                  Filter data by county, municipality, eligibility score, or
                  population
                </li>
                <li>
                  Click on column headers to sort the data in ascending or
                  descending order
                </li>
                <li>
                  Review at-risk percentages to identify precincts with high
                  proportions of at-risk voters
                </li>
                <li>
                  Use the color indicators to quickly identify precincts with
                  low, medium, or high eligibility scores
                </li>
              </ul>
              <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                Data Sources
              </h3>
              <p className="text-gray-600">
                This visualization uses Virginia precinct data with eligibility
                scores calculated based on various factors including
                registration status, address verification, and voter activity
                history.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default VoterEligibilityMapPage;