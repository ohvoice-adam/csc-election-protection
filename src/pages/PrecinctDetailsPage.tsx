import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, DownloadIcon } from 'lucide-react';
import DemographicsTable from '../components/admin/analytics/DemographicsTable';
import DemographicBarChart from '../components/admin/analytics/DemographicBarChart';
import { virginiaPrecinctData } from '../components/admin/analytics/MapView';
const PrecinctDetailsPage: React.FC = () => {
  const {
    precinctId
  } = useParams<{
    precinctId: string;
  }>();
  const navigate = useNavigate();
  const [selectedPrecinct, setSelectedPrecinct] = useState<any>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  // Check if dark mode is enabled
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setDarkMode(isDarkMode);
  }, []);
  // Find the selected precinct from the sample data
  useEffect(() => {
    if (precinctId) {
      const precinct = virginiaPrecinctData.find(p => p.id === precinctId);
      setSelectedPrecinct(precinct || null);
    }
  }, [precinctId]);
  // Handle back button click
  const handleBack = () => {
    navigate(-1);
  };
  if (!selectedPrecinct) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <button onClick={handleBack} className="flex items-center text-blue-600 dark:text-blue-400 mb-6">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back
          </button>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Precinct Details
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Precinct not found or still loading...
            </p>
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <button onClick={handleBack} className="flex items-center text-blue-600 dark:text-blue-400 mb-6">
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back to Map
        </button>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {selectedPrecinct.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedPrecinct.municipality}, {selectedPrecinct.county}{' '}
                County
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${selectedPrecinct.avgScore >= 0.8 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : selectedPrecinct.avgScore >= 0.6 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                Eligibility Score:{' '}
                {(selectedPrecinct.avgScore * 100).toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Precinct Overview
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Voters
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedPrecinct.affectedPopulation.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    At-Risk Voters
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedPrecinct.atRiskVoters.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    At-Risk Percentage
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {(selectedPrecinct.atRiskVoters / selectedPrecinct.affectedPopulation * 100).toFixed(1)}
                    %
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Eligibility Score
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {(selectedPrecinct.avgScore * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Demographic Breakdown
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    White
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {selectedPrecinct.demographics.white.population.toLocaleString()}
                    <span className="text-sm font-normal ml-1">
                      (
                      {(selectedPrecinct.demographics.white.population / selectedPrecinct.affectedPopulation * 100).toFixed(1)}
                      %)
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    African American
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {selectedPrecinct.demographics.black.population.toLocaleString()}
                    <span className="text-sm font-normal ml-1">
                      (
                      {(selectedPrecinct.demographics.black.population / selectedPrecinct.affectedPopulation * 100).toFixed(1)}
                      %)
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hispanic
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {selectedPrecinct.demographics.hispanic.population.toLocaleString()}
                    <span className="text-sm font-normal ml-1">
                      (
                      {(selectedPrecinct.demographics.hispanic.population / selectedPrecinct.affectedPopulation * 100).toFixed(1)}
                      %)
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    AAPI
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {selectedPrecinct.demographics.asian.population.toLocaleString()}
                    <span className="text-sm font-normal ml-1">
                      (
                      {(selectedPrecinct.demographics.asian.population / selectedPrecinct.affectedPopulation * 100).toFixed(1)}
                      %)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Demographic Distribution
            </h3>
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
              <DemographicBarChart precinct={selectedPrecinct} darkMode={darkMode} />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Polling Places Demographics
              </h3>
              <div className="flex space-x-2">
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <DownloadIcon className="w-4 h-4 mr-1" />
                  Export CSV
                </button>
              </div>
            </div>
            <DemographicsTable precincts={virginiaPrecinctData} darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>;
};
export default PrecinctDetailsPage;