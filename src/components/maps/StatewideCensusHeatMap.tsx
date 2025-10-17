import React, { useEffect, useState } from 'react';
import { InfoIcon, Search, X, ChevronDownIcon, ChevronUpIcon, ArrowUpDownIcon } from 'lucide-react';
// Mock data for Virginia precincts with eligibility scores and population data
const virginiaPrecinctData = [{
  id: 'P001',
  name: 'Arlington Central Precinct',
  county: 'Arlington',
  municipality: 'Arlington',
  coordinates: [38.87, -77.1],
  avgScore: 0.92,
  affectedPopulation: 1245,
  atRiskVoters: 84
}, {
  id: 'P002',
  name: 'Arlington Heights Precinct',
  county: 'Arlington',
  municipality: 'Arlington',
  coordinates: [38.9, -77.12],
  avgScore: 0.88,
  affectedPopulation: 980,
  atRiskVoters: 103
}, {
  id: 'P003',
  name: 'Fairfax Central Precinct',
  county: 'Fairfax',
  municipality: 'Fairfax City',
  coordinates: [38.85, -77.3],
  avgScore: 0.81,
  affectedPopulation: 1520,
  atRiskVoters: 237
}, {
  id: 'P004',
  name: 'Fairfax North Precinct',
  county: 'Fairfax',
  municipality: 'Fairfax City',
  coordinates: [38.89, -77.28],
  avgScore: 0.79,
  affectedPopulation: 1350,
  atRiskVoters: 256
}, {
  id: 'P005',
  name: 'Alexandria Old Town Precinct',
  county: 'Alexandria',
  municipality: 'Alexandria',
  coordinates: [38.81, -77.04],
  avgScore: 0.85,
  affectedPopulation: 1150,
  atRiskVoters: 172
}, {
  id: 'P006',
  name: 'Alexandria West Precinct',
  county: 'Alexandria',
  municipality: 'Alexandria',
  coordinates: [38.82, -77.08],
  avgScore: 0.77,
  affectedPopulation: 1050,
  atRiskVoters: 210
}, {
  id: 'P007',
  name: 'Loudoun East Precinct',
  county: 'Loudoun',
  municipality: 'Leesburg',
  coordinates: [39.03, -77.54],
  avgScore: 0.83,
  affectedPopulation: 1680,
  atRiskVoters: 252
}, {
  id: 'P008',
  name: 'Loudoun West Precinct',
  county: 'Loudoun',
  municipality: 'Leesburg',
  coordinates: [39.02, -77.6],
  avgScore: 0.8,
  affectedPopulation: 1420,
  atRiskVoters: 227
}, {
  id: 'P009',
  name: 'Richmond Downtown Precinct',
  county: 'Richmond City',
  municipality: 'Richmond',
  coordinates: [37.54, -77.43],
  avgScore: 0.65,
  affectedPopulation: 1870,
  atRiskVoters: 561
}, {
  id: 'P010',
  name: 'Richmond East Precinct',
  county: 'Richmond City',
  municipality: 'Richmond',
  coordinates: [37.53, -77.38],
  avgScore: 0.62,
  affectedPopulation: 1650,
  atRiskVoters: 577
}, {
  id: 'P011',
  name: 'Norfolk Central Precinct',
  county: 'Norfolk',
  municipality: 'Norfolk',
  coordinates: [36.86, -76.28],
  avgScore: 0.55,
  affectedPopulation: 2100,
  atRiskVoters: 840
}, {
  id: 'P012',
  name: 'Norfolk East Precinct',
  county: 'Norfolk',
  municipality: 'Norfolk',
  coordinates: [36.85, -76.23],
  avgScore: 0.52,
  affectedPopulation: 1920,
  atRiskVoters: 844
}, {
  id: 'P013',
  name: 'Henrico North Precinct',
  county: 'Henrico',
  municipality: 'Henrico',
  coordinates: [37.63, -77.46],
  avgScore: 0.76,
  affectedPopulation: 1430,
  atRiskVoters: 300
}, {
  id: 'P014',
  name: 'Henrico East Precinct',
  county: 'Henrico',
  municipality: 'Henrico',
  coordinates: [37.57, -77.4],
  avgScore: 0.72,
  affectedPopulation: 1280,
  atRiskVoters: 320
}, {
  id: 'P015',
  name: 'Virginia Beach North Precinct',
  county: 'Virginia Beach',
  municipality: 'Virginia Beach',
  coordinates: [36.86, -76.03],
  avgScore: 0.82,
  affectedPopulation: 1780,
  atRiskVoters: 285
}, {
  id: 'P016',
  name: 'Virginia Beach Oceanfront Precinct',
  county: 'Virginia Beach',
  municipality: 'Virginia Beach',
  coordinates: [36.85, -75.96],
  avgScore: 0.79,
  affectedPopulation: 1650,
  atRiskVoters: 297
}, {
  id: 'P017',
  name: 'Chesterfield Central Precinct',
  county: 'Chesterfield',
  municipality: 'Chesterfield',
  coordinates: [37.39, -77.5],
  avgScore: 0.74,
  affectedPopulation: 1520,
  atRiskVoters: 350
}, {
  id: 'P018',
  name: 'Chesterfield South Precinct',
  county: 'Chesterfield',
  municipality: 'Chesterfield',
  coordinates: [37.33, -77.48],
  avgScore: 0.71,
  affectedPopulation: 1380,
  atRiskVoters: 345
}, {
  id: 'P019',
  name: 'Roanoke Central Precinct',
  county: 'Roanoke',
  municipality: 'Roanoke',
  coordinates: [37.27, -79.94],
  avgScore: 0.68,
  affectedPopulation: 1620,
  atRiskVoters: 470
}, {
  id: 'P020',
  name: 'Roanoke North Precinct',
  county: 'Roanoke',
  municipality: 'Roanoke',
  coordinates: [37.31, -79.93],
  avgScore: 0.65,
  affectedPopulation: 1480,
  atRiskVoters: 444
}, {
  id: 'P021',
  name: 'Charlottesville Downtown Precinct',
  county: 'Charlottesville',
  municipality: 'Charlottesville',
  coordinates: [38.03, -78.48],
  avgScore: 0.78,
  affectedPopulation: 1320,
  atRiskVoters: 264
}, {
  id: 'P022',
  name: 'Charlottesville University Precinct',
  county: 'Charlottesville',
  municipality: 'Charlottesville',
  coordinates: [38.04, -78.5],
  avgScore: 0.82,
  affectedPopulation: 1570,
  atRiskVoters: 251
}, {
  id: 'P023',
  name: 'Lynchburg Central Precinct',
  county: 'Lynchburg',
  municipality: 'Lynchburg',
  coordinates: [37.41, -79.14],
  avgScore: 0.7,
  affectedPopulation: 1450,
  atRiskVoters: 406
}, {
  id: 'P024',
  name: 'Hampton Central Precinct',
  county: 'Hampton',
  municipality: 'Hampton',
  coordinates: [37.03, -76.35],
  avgScore: 0.63,
  affectedPopulation: 1580,
  atRiskVoters: 521
}, {
  id: 'P025',
  name: 'Newport News Central Precinct',
  county: 'Newport News',
  municipality: 'Newport News',
  coordinates: [37.08, -76.48],
  avgScore: 0.61,
  affectedPopulation: 1720,
  atRiskVoters: 602
}, {
  id: 'P026',
  name: 'Danville Central Precinct',
  county: 'Danville',
  municipality: 'Danville',
  coordinates: [36.59, -79.4],
  avgScore: 0.58,
  affectedPopulation: 1380,
  atRiskVoters: 518
}, {
  id: 'P027',
  name: 'Chesapeake North Precinct',
  county: 'Chesapeake',
  municipality: 'Chesapeake',
  coordinates: [36.77, -76.28],
  avgScore: 0.67,
  affectedPopulation: 1650,
  atRiskVoters: 495
}, {
  id: 'P028',
  name: 'Suffolk Central Precinct',
  county: 'Suffolk',
  municipality: 'Suffolk',
  coordinates: [36.73, -76.58],
  avgScore: 0.64,
  affectedPopulation: 1420,
  atRiskVoters: 455
}, {
  id: 'P029',
  name: 'Fredericksburg Central Precinct',
  county: 'Fredericksburg',
  municipality: 'Fredericksburg',
  coordinates: [38.3, -77.47],
  avgScore: 0.73,
  affectedPopulation: 1380,
  atRiskVoters: 331
}, {
  id: 'P030',
  name: 'Harrisonburg Central Precinct',
  county: 'Harrisonburg',
  municipality: 'Harrisonburg',
  coordinates: [38.45, -78.87],
  avgScore: 0.75,
  affectedPopulation: 1520,
  atRiskVoters: 334
}];
// Searchable dropdown component
const SearchableDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  label,
  darkMode
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  darkMode: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredOptions = options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="relative">
      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </label>
      <div className={`relative rounded-md shadow-sm ${isOpen ? 'ring-2 ring-blue-500' : ''}`}>
        <div className={`flex items-center justify-between px-3 py-2 border ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-700'} rounded-md cursor-pointer`} onClick={() => setIsOpen(!isOpen)}>
          <span className={value ? '' : 'text-gray-500'}>
            {value || placeholder}
          </span>
          {value && <button type="button" className="ml-2" onClick={e => {
          e.stopPropagation();
          onChange('');
          setSearchTerm('');
        }}>
              <X className="h-4 w-4 text-gray-400" />
            </button>}
        </div>
        {isOpen && <div className={`absolute z-10 mt-1 w-full rounded-md shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <div className="px-2 py-2 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <input type="text" className={`block w-full pl-8 pr-3 py-2 text-sm rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300 placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-blue-500 focus:border-blue-500`} placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onClick={e => e.stopPropagation()} />
              </div>
            </div>
            <ul className="max-h-60 overflow-auto py-1">
              {filteredOptions.length === 0 ? <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                  No results found
                </li> : filteredOptions.map(option => <li key={option} className={`px-3 py-2 text-sm cursor-pointer ${option === value ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-900' : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`} onClick={() => {
            onChange(option);
            setIsOpen(false);
            setSearchTerm('');
          }}>
                    {option}
                  </li>)}
            </ul>
          </div>}
      </div>
    </div>;
};
interface StatewideCensusHeatMapProps {
  darkMode?: boolean;
  initialCenter?: [number, number];
  initialZoom?: number;
}
const StatewideCensusHeatMap: React.FC<StatewideCensusHeatMapProps> = ({
  darkMode = false,
  initialCenter = [37.5, -78.8],
  // Center of Virginia
  initialZoom = 7
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Filters
  const [selectedCounty, setSelectedCounty] = useState<string>('');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('');
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 1]);
  const [populationRange, setPopulationRange] = useState<[number, number]>([0, 3000]);
  // Sorting
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  // Extract unique counties and municipalities
  const counties = Array.from(new Set(virginiaPrecinctData.map(precinct => precinct.county))).sort();
  // Get municipalities based on selected county
  const municipalities = Array.from(new Set(virginiaPrecinctData.filter(precinct => !selectedCounty || precinct.county === selectedCounty).map(precinct => precinct.municipality))).sort();
  // Filter data based on selections
  const filteredData = virginiaPrecinctData.filter(precinct => {
    return (!selectedCounty || precinct.county === selectedCounty) && (!selectedMunicipality || precinct.municipality === selectedMunicipality) && precinct.avgScore >= scoreRange[0] && precinct.avgScore <= scoreRange[1] && precinct.affectedPopulation >= populationRange[0] && precinct.affectedPopulation <= populationRange[1];
  });
  // Sort the filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'county':
        comparison = a.county.localeCompare(b.county);
        break;
      case 'municipality':
        comparison = a.municipality.localeCompare(b.municipality);
        break;
      case 'avgScore':
        comparison = a.avgScore - b.avgScore;
        break;
      case 'affectedPopulation':
        comparison = a.affectedPopulation - b.affectedPopulation;
        break;
      case 'atRiskVoters':
        comparison = a.atRiskVoters - b.atRiskVoters;
        break;
      case 'atRiskPercentage':
        const aPercentage = a.atRiskVoters / a.affectedPopulation * 100;
        const bPercentage = b.atRiskVoters / b.affectedPopulation * 100;
        comparison = aPercentage - bPercentage;
        break;
      default:
        comparison = 0;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  // Reset municipality when county changes
  useEffect(() => {
    setSelectedMunicipality('');
  }, [selectedCounty]);
  // Function to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 0.9) return '#084c61'; // Dark blue for high scores
    if (score >= 0.8) return '#0d6986';
    if (score >= 0.7) return '#1286aa';
    if (score >= 0.6) return '#1aa3cd';
    if (score >= 0.5) return '#4db4d7';
    if (score >= 0.4) return '#80c5e0';
    if (score >= 0.3) return '#a6d4e7';
    if (score >= 0.2) return '#cce4ef';
    return '#e6f2f7'; // Light blue for low scores
  };
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  // Reset filters
  const resetFilters = () => {
    setSelectedCounty('');
    setSelectedMunicipality('');
    setScoreRange([0, 1]);
    setPopulationRange([0, 3000]);
  };
  // Handle sort change
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  // Render sort indicator
  const renderSortIndicator = (field: string) => {
    if (sortField !== field) {
      return <ArrowUpDownIcon className="h-4 w-4 ml-1 text-gray-400" />;
    }
    return sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4 ml-1" /> : <ChevronDownIcon className="h-4 w-4 ml-1" />;
  };
  return <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Virginia Voter Eligibility Precinct List
        </h2>
        <button onClick={resetFilters} className={`px-3 py-1.5 text-sm font-medium rounded-md ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
          Reset Filters
        </button>
      </div>
      {/* Filters */}
      <div className={`p-4 border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} rounded-lg`}>
        <h3 className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Filter Data
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* County Filter */}
          <SearchableDropdown options={counties} value={selectedCounty} onChange={setSelectedCounty} placeholder="All Counties" label="County" darkMode={darkMode} />
          {/* Municipality Filter */}
          <SearchableDropdown options={municipalities} value={selectedMunicipality} onChange={setSelectedMunicipality} placeholder="All Municipalities" label="Municipality" darkMode={darkMode} />
          {/* Score Range Filter */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Eligibility Score: {(scoreRange[0] * 100).toFixed(0)}% -{' '}
              {(scoreRange[1] * 100).toFixed(0)}%
            </label>
            <div className="space-y-4">
              <input type="range" min="0" max="100" step="5" value={scoreRange[0] * 100} onChange={e => {
              const min = parseInt(e.target.value) / 100;
              if (min <= scoreRange[1]) setScoreRange([min, scoreRange[1]]);
            }} className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
              <input type="range" min="0" max="100" step="5" value={scoreRange[1] * 100} onChange={e => {
              const max = parseInt(e.target.value) / 100;
              if (max >= scoreRange[0]) setScoreRange([scoreRange[0], max]);
            }} className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
            </div>
          </div>
          {/* Population Range Filter */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Population: {populationRange[0]} - {populationRange[1]}
            </label>
            <div className="space-y-4">
              <input type="range" min="0" max="3000" step="100" value={populationRange[0]} onChange={e => {
              const min = parseInt(e.target.value);
              if (min <= populationRange[1]) setPopulationRange([min, populationRange[1]]);
            }} className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
              <input type="range" min="0" max="3000" step="100" value={populationRange[1]} onChange={e => {
              const max = parseInt(e.target.value);
              if (max >= populationRange[0]) setPopulationRange([populationRange[0], max]);
            }} className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
            </div>
          </div>
        </div>
        <div className="mt-3 text-sm">
          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {filteredData.length} of {virginiaPrecinctData.length}{' '}
            precincts
          </span>
        </div>
      </div>
      {/* Legend */}
      <div className={`flex flex-wrap items-center gap-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4" style={{
          backgroundColor: '#e6f2f7'
        }}></div>
          <span className="text-xs">Low Score (0-20%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4" style={{
          backgroundColor: '#80c5e0'
        }}></div>
          <span className="text-xs">Medium (40-60%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4" style={{
          backgroundColor: '#084c61'
        }}></div>
          <span className="text-xs">High Score (80-100%)</span>
        </div>
      </div>
      {/* Precinct List */}
      <div className={`relative w-full border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden shadow-lg`}>
        {isLoading ? <div className="flex items-center justify-center h-[600px] bg-white bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className={`mt-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Loading precinct data...
              </p>
            </div>
          </div> : <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                  <tr>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider cursor-pointer`} onClick={() => handleSort('name')}>
                      <div className="flex items-center">
                        Precinct
                        {renderSortIndicator('name')}
                      </div>
                    </th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider cursor-pointer`} onClick={() => handleSort('county')}>
                      <div className="flex items-center">
                        County
                        {renderSortIndicator('county')}
                      </div>
                    </th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider cursor-pointer`} onClick={() => handleSort('municipality')}>
                      <div className="flex items-center">
                        Municipality
                        {renderSortIndicator('municipality')}
                      </div>
                    </th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider cursor-pointer`} onClick={() => handleSort('avgScore')}>
                      <div className="flex items-center">
                        Eligibility Score
                        {renderSortIndicator('avgScore')}
                      </div>
                    </th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider cursor-pointer`} onClick={() => handleSort('affectedPopulation')}>
                      <div className="flex items-center">
                        Population
                        {renderSortIndicator('affectedPopulation')}
                      </div>
                    </th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider cursor-pointer`} onClick={() => handleSort('atRiskVoters')}>
                      <div className="flex items-center">
                        At-Risk Voters
                        {renderSortIndicator('atRiskVoters')}
                      </div>
                    </th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider cursor-pointer`} onClick={() => handleSort('atRiskPercentage')}>
                      <div className="flex items-center">
                        At-Risk %{renderSortIndicator('atRiskPercentage')}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className={`${darkMode ? 'divide-y divide-gray-700' : 'divide-y divide-gray-200'}`}>
                  {sortedData.length > 0 ? sortedData.map(precinct => {
                const atRiskPercentage = precinct.atRiskVoters / precinct.affectedPopulation * 100;
                return <tr key={precinct.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {precinct.name}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            {precinct.county}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            {precinct.municipality}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-4 w-4 mr-2" style={{
                        backgroundColor: getScoreColor(precinct.avgScore)
                      }}></div>
                              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                                {(precinct.avgScore * 100).toFixed(1)}%
                              </span>
                            </div>
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            {precinct.affectedPopulation.toLocaleString()}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            {precinct.atRiskVoters.toLocaleString()}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${atRiskPercentage > 30 ? 'text-red-500' : atRiskPercentage > 20 ? 'text-yellow-500' : 'text-green-500'}`}>
                            {atRiskPercentage.toFixed(1)}%
                          </td>
                        </tr>;
              }) : <tr>
                      <td colSpan={7} className={`px-6 py-12 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No precincts match the current filters. Try adjusting
                        your filter criteria.
                      </td>
                    </tr>}
                </tbody>
              </table>
            </div>
            {sortedData.length > 10 && <div className={`px-6 py-3 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Showing {sortedData.length} precincts
                </p>
              </div>}
          </div>}
      </div>
      <div className={`flex items-center p-3 border ${darkMode ? 'border-blue-800 bg-blue-900 text-blue-200' : 'border-blue-200 bg-blue-50 text-blue-800'} rounded-md text-sm`}>
        <InfoIcon className="h-5 w-5 mr-2 flex-shrink-0" />
        <div>
          <p className="font-medium">About this data:</p>
          <p className="text-xs mt-1">
            This list displays voter eligibility data by precinct across
            Virginia. Each row shows a precinct's eligibility score, affected
            population, and at-risk voters. Use the filters above to explore
            specific counties, municipalities, score ranges, or population
            sizes. Click on column headers to sort the data.
          </p>
        </div>
      </div>
    </div>;
};
export default StatewideCensusHeatMap;