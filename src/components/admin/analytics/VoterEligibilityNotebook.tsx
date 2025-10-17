import React, { useEffect, useState } from 'react';
import NotebookNavigation from './NotebookNavigation';
import Filters from './Filters';
import AnalyticsCells from './AnalyticsCells';
import { regionBounds, mockPrecincts, mockVoters, dataAnalysis } from './mockData';
interface FilterState {
  race: string[];
  gender: string[];
  scoreRange: [number, number];
  municipality: string[];
}
const VoterEligibilityNotebook: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<string>('statewide');
  const [filteredPrecincts, setFilteredPrecincts] = useState(mockPrecincts);
  const [filteredVoters, setFilteredVoters] = useState(mockVoters);
  const [filters, setFilters] = useState<FilterState>({
    race: [],
    gender: [],
    scoreRange: [0, 1],
    municipality: []
  });
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Apply filters to the data
  useEffect(() => {
    setIsLoading(true);
    // Use setTimeout to simulate data processing
    setTimeout(() => {
      let filteredVoterData = mockVoters;
      // Apply race filter
      if (filters.race.length > 0) {
        filteredVoterData = filteredVoterData.filter(voter => filters.race.includes(voter.race));
      }
      // Apply gender filter
      if (filters.gender.length > 0) {
        filteredVoterData = filteredVoterData.filter(voter => filters.gender.includes(voter.gender));
      }
      // Apply score range filter
      filteredVoterData = filteredVoterData.filter(voter => voter.voter_eligibility_score >= filters.scoreRange[0] && voter.voter_eligibility_score <= filters.scoreRange[1]);
      // Apply municipality filter
      if (filters.municipality.length > 0) {
        filteredVoterData = filteredVoterData.filter(voter => filters.municipality.includes(voter.municipality));
      }
      setFilteredVoters(filteredVoterData);
      // Update precincts based on filtered data
      // In a real app, we would recalculate precinct statistics based on filtered voters
      // For this mock, we'll just filter precincts that match municipality filter
      let filteredPrecinctData = mockPrecincts;
      if (filters.municipality.length > 0) {
        filteredPrecinctData = {
          ...mockPrecincts,
          features: mockPrecincts.features.filter(precinct => filters.municipality.includes(precinct.properties.municipality))
        };
      }
      // Apply score range filter to precincts
      filteredPrecinctData = {
        ...filteredPrecinctData,
        features: filteredPrecinctData.features.filter(precinct => precinct.properties.avgScore >= filters.scoreRange[0] && precinct.properties.avgScore <= filters.scoreRange[1])
      };
      setFilteredPrecincts(filteredPrecinctData);
      setIsLoading(false);
    }, 500);
  }, [filters, activeRegion]);
  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters({
      ...filters,
      ...newFilters
    });
  };
  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-xl transition-colors duration-200`}>
      <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex justify-between items-center p-4">
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Voter Eligibility Analysis
          </h2>
          <div className="flex items-center gap-3">
            <button onClick={toggleDarkMode} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
        <NotebookNavigation activeRegion={activeRegion} setActiveRegion={setActiveRegion} darkMode={darkMode} />
      </div>
      <div className="p-5 space-y-6">
        <Filters filters={filters} onChange={handleFilterChange} darkMode={darkMode} />
        <div className={`relative ${isLoading ? 'opacity-60' : 'opacity-100'} transition-opacity`}>
          {isLoading && <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className={`rounded-md p-3 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            </div>}
        </div>
        <AnalyticsCells region={activeRegion} precincts={filteredPrecincts} voters={filteredVoters} analysis={dataAnalysis} darkMode={darkMode} />
      </div>
    </div>;
};
export default VoterEligibilityNotebook;