import React, { useState } from 'react';
import { FilterIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
interface FiltersProps {
  filters: {
    race: string[];
    gender: string[];
    scoreRange: [number, number];
    municipality: string[];
  };
  onChange: (filters: any) => void;
  darkMode: boolean;
}
const Filters: React.FC<FiltersProps> = ({
  filters,
  onChange,
  darkMode
}) => {
  const [expanded, setExpanded] = useState(false);
  const [scoreMin, setScoreMin] = useState(filters.scoreRange[0] * 100);
  const [scoreMax, setScoreMax] = useState(filters.scoreRange[1] * 100);
  // Available options
  const raceOptions = ['White', 'Black', 'Hispanic', 'Asian', 'Other'];
  const genderOptions = ['Male', 'Female'];
  const municipalityOptions = ['Richmond', 'Norfolk', 'Virginia Beach', 'Alexandria', 'Arlington', 'Fairfax', 'Charlottesville', 'Roanoke', 'Lynchburg', 'Danville', 'Hampton', 'Newport News', 'Chesapeake', 'Suffolk', 'Petersburg'];
  // Toggle selection in a multi-select array
  const toggleSelection = (array: string[], value: string) => {
    if (array.includes(value)) {
      return array.filter(item => item !== value);
    } else {
      return [...array, value];
    }
  };
  // Handle race filter changes
  const handleRaceChange = (race: string) => {
    const newRaces = toggleSelection(filters.race, race);
    onChange({
      race: newRaces
    });
  };
  // Handle gender filter changes
  const handleGenderChange = (gender: string) => {
    const newGenders = toggleSelection(filters.gender, gender);
    onChange({
      gender: newGenders
    });
  };
  // Handle municipality filter changes
  const handleMunicipalityChange = (municipality: string) => {
    const newMunicipalities = toggleSelection(filters.municipality, municipality);
    onChange({
      municipality: newMunicipalities
    });
  };
  // Handle score range changes
  const handleScoreRangeChange = () => {
    onChange({
      scoreRange: [scoreMin / 100, scoreMax / 100]
    });
  };
  // Reset all filters
  const resetFilters = () => {
    setScoreMin(0);
    setScoreMax(100);
    onChange({
      race: [],
      gender: [],
      scoreRange: [0, 1],
      municipality: []
    });
  };
  return <div className={`notebook-cell filter-cell border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} rounded-lg p-4 shadow-sm`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FilterIcon className={`w-5 h-5 mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Data Filters
          </h3>
        </div>
        <button onClick={() => setExpanded(!expanded)} className={`p-1.5 rounded-md ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`} aria-expanded={expanded} aria-label={expanded ? 'Collapse filters' : 'Expand filters'}>
          {expanded ? <ChevronUpIcon size={20} /> : <ChevronDownIcon size={20} />}
        </button>
      </div>
      {expanded && <div className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Race Filter */}
            <div className="space-y-2">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Race/Ethnicity
              </label>
              <div className="space-y-2 bg-opacity-50 p-2 rounded-md border border-opacity-30 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                {raceOptions.map(race => <label key={race} className="flex items-center">
                    <input type="checkbox" checked={filters.race.includes(race)} onChange={() => handleRaceChange(race)} className={`h-4 w-4 rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-blue-500' : 'border-gray-300 text-blue-600'}`} />
                    <span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {race}
                    </span>
                  </label>)}
              </div>
            </div>
            {/* Gender Filter */}
            <div className="space-y-2">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Gender
              </label>
              <div className="space-y-2 bg-opacity-50 p-2 rounded-md border border-opacity-30 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                {genderOptions.map(gender => <label key={gender} className="flex items-center">
                    <input type="checkbox" checked={filters.gender.includes(gender)} onChange={() => handleGenderChange(gender)} className={`h-4 w-4 rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-blue-500' : 'border-gray-300 text-blue-600'}`} />
                    <span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {gender}
                    </span>
                  </label>)}
              </div>
            </div>
            {/* Eligibility Score Range */}
            <div className="space-y-2">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Eligibility Score Range
              </label>
              <div className="space-y-4 bg-opacity-50 p-3 rounded-md border border-opacity-30 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {scoreMin}%
                  </span>
                  <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {scoreMax}%
                  </span>
                </div>
                <div>
                  <label className={`block text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Min Score
                  </label>
                  <input type="range" min="0" max="100" value={scoreMin} onChange={e => {
                const value = parseInt(e.target.value);
                if (value <= scoreMax) setScoreMin(value);
              }} onMouseUp={handleScoreRangeChange} onTouchEnd={handleScoreRangeChange} className={`w-full h-2 ${darkMode ? 'bg-gray-600' : 'bg-blue-100'} rounded-lg appearance-none cursor-pointer`} />
                </div>
                <div>
                  <label className={`block text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Max Score
                  </label>
                  <input type="range" min="0" max="100" value={scoreMax} onChange={e => {
                const value = parseInt(e.target.value);
                if (value >= scoreMin) setScoreMax(value);
              }} onMouseUp={handleScoreRangeChange} onTouchEnd={handleScoreRangeChange} className={`w-full h-2 ${darkMode ? 'bg-gray-600' : 'bg-blue-100'} rounded-lg appearance-none cursor-pointer`} />
                </div>
              </div>
            </div>
          </div>
          {/* Municipality Filter */}
          <div className="space-y-2">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Municipality
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-3 bg-opacity-50 rounded-md border border-opacity-30 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
              {municipalityOptions.map(municipality => <label key={municipality} className="flex items-center">
                  <input type="checkbox" checked={filters.municipality.includes(municipality)} onChange={() => handleMunicipalityChange(municipality)} className={`h-4 w-4 rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-blue-500' : 'border-gray-300 text-blue-600'}`} />
                  <span className={`ml-2 text-sm truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {municipality}
                  </span>
                </label>)}
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button onClick={resetFilters} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              Reset Filters
            </button>
          </div>
        </div>}
      {!expanded && <div className="mt-2">
          <div className="flex flex-wrap gap-2">
            {filters.race.length > 0 && <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                Race: {filters.race.join(', ')}
              </span>}
            {filters.gender.length > 0 && <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'}`}>
                Gender: {filters.gender.join(', ')}
              </span>}
            {(filters.scoreRange[0] > 0 || filters.scoreRange[1] < 1) && <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                Score: {(filters.scoreRange[0] * 100).toFixed(0)}% -{' '}
                {(filters.scoreRange[1] * 100).toFixed(0)}%
              </span>}
            {filters.municipality.length > 0 && <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'}`}>
                Municipalities: {filters.municipality.length}
              </span>}
            {filters.race.length === 0 && filters.gender.length === 0 && filters.scoreRange[0] === 0 && filters.scoreRange[1] === 1 && filters.municipality.length === 0 && <span className={`text-xs italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No filters applied - showing all data
                </span>}
          </div>
        </div>}
    </div>;
};
export default Filters;