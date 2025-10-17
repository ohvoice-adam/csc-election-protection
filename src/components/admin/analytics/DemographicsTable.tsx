import React, { useEffect, useState, createElement } from 'react';
import { ArrowUpIcon, ArrowDownIcon, ArrowUpDownIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
interface DemographicsTableProps {
  precincts: any[];
  darkMode: boolean;
}
type SortField = 'name' | 'county' | 'white' | 'black' | 'hispanic' | 'asian' | 'other' | 'total' | 'score';
type SortOrder = 'asc' | 'desc';
type DisplayMode = 'count' | 'percentage';
const DemographicsTable: React.FC<DemographicsTableProps> = ({
  precincts,
  darkMode
}) => {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('count');
  const [sortedData, setSortedData] = useState<any[]>([]);
  // Sort the data when sort field, order, or data changes
  useEffect(() => {
    const sorted = [...precincts].sort((a, b) => {
      let aValue, bValue;
      switch (sortField) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        case 'county':
          aValue = a.county;
          bValue = b.county;
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        case 'white':
          aValue = a.demographics.white.population;
          bValue = b.demographics.white.population;
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        case 'black':
          aValue = a.demographics.black.population;
          bValue = b.demographics.black.population;
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        case 'hispanic':
          aValue = a.demographics.hispanic.population;
          bValue = b.demographics.hispanic.population;
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        case 'asian':
          aValue = a.demographics.asian.population;
          bValue = b.demographics.asian.population;
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        case 'total':
          aValue = a.affectedPopulation;
          bValue = b.affectedPopulation;
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        case 'score':
          aValue = a.avgScore;
          bValue = b.avgScore;
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        default:
          return 0;
      }
    });
    setSortedData(sorted);
  }, [precincts, sortField, sortOrder]);
  // Handle column header click to sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };
  // Toggle between count and percentage display
  const toggleDisplayMode = () => {
    setDisplayMode(displayMode === 'count' ? 'percentage' : 'count');
  };
  // Export table data to CSV
  const exportToCSV = () => {
    const headers = ['Polling Place Name', 'County', 'African American (count)', 'African American (%)', 'White (count)', 'White (%)', 'Hispanic (count)', 'Hispanic (%)', 'AAPI (count)', 'AAPI (%)', 'Other (count)', 'Other (%)', 'Total Voters', 'Median At-Risk Voter Eligibility Score'];
    const rows = sortedData.map(precinct => {
      const total = precinct.affectedPopulation;
      const white = precinct.demographics.white.population;
      const black = precinct.demographics.black.population;
      const hispanic = precinct.demographics.hispanic.population;
      const asian = precinct.demographics.asian.population;
      const other = 0; // No other in our data model, but included for completeness
      return [precinct.name, precinct.county, black, (black / total * 100).toFixed(1), white, (white / total * 100).toFixed(1), hispanic, (hispanic / total * 100).toFixed(1), asian, (asian / total * 100).toFixed(1), other, (other / total * 100).toFixed(1), total, precinct.avgScore.toFixed(2)];
    });
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'polling_place_demographics.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // Render sort icon based on current sort state
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDownIcon className="w-4 h-4 ml-1 text-gray-400" />;
    }
    return sortOrder === 'asc' ? <ArrowUpIcon className="w-4 h-4 ml-1 text-blue-600 dark:text-blue-400" /> : <ArrowDownIcon className="w-4 h-4 ml-1 text-blue-600 dark:text-blue-400" />;
  };
  // Format demographic value based on display mode
  const formatDemographic = (count: number, total: number) => {
    if (displayMode === 'count') {
      return count.toLocaleString();
    }
    return `${(count / total * 100).toFixed(1)}%`;
  };
  return <div>
      <div className="flex justify-end mb-4">
        <div className="flex space-x-2">
          <button onClick={toggleDisplayMode} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            Show {displayMode === 'count' ? 'Percentages' : 'Counts'}
          </button>
          <button onClick={exportToCSV} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            Export CSV
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center">
                  Polling Place Name
                  {renderSortIcon('name')}
                </div>
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('county')}>
                <div className="flex items-center">
                  County
                  {renderSortIcon('county')}
                </div>
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('black')}>
                <div className="flex items-center">
                  African American
                  {renderSortIcon('black')}
                </div>
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('white')}>
                <div className="flex items-center">
                  White
                  {renderSortIcon('white')}
                </div>
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('hispanic')}>
                <div className="flex items-center">
                  Hispanic
                  {renderSortIcon('hispanic')}
                </div>
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('asian')}>
                <div className="flex items-center">
                  AAPI
                  {renderSortIcon('asian')}
                </div>
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('total')}>
                <div className="flex items-center">
                  Total Voters
                  {renderSortIcon('total')}
                </div>
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('score')}>
                <div className="flex items-center">
                  Eligibility Score
                  {renderSortIcon('score')}
                </div>
              </th>
              <th scope="col" className="relative px-3 py-3.5">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedData.map(precinct => {
            const total = precinct.affectedPopulation;
            return <tr key={precinct.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                    {precinct.name}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm">
                    {precinct.county}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm">
                    {formatDemographic(precinct.demographics.black.population, total)}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm">
                    {formatDemographic(precinct.demographics.white.population, total)}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm">
                    {formatDemographic(precinct.demographics.hispanic.population, total)}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm">
                    {formatDemographic(precinct.demographics.asian.population, total)}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm">
                    {precinct.affectedPopulation.toLocaleString()}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${precinct.avgScore >= 0.8 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : precinct.avgScore >= 0.6 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                      {(precinct.avgScore * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-right">
                    <Link to={`/precinct/${precinct.id}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                      View Details
                    </Link>
                  </td>
                </tr>;
          })}
          </tbody>
        </table>
      </div>
    </div>;
};
export default DemographicsTable;