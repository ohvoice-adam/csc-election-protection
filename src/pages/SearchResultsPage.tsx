import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SearchIcon, ArrowLeftIcon, FilterIcon, SlidersIcon, MapPinIcon, CalendarIcon } from 'lucide-react';
// Sample search results data
const sampleResults = [{
  id: 1,
  type: 'Accessibility Issue',
  location: 'Central High School, Fairfax County',
  date: '2023-11-05',
  description: 'Wheelchair ramp is blocked by construction materials.',
  status: 'Open',
  county: 'Fairfax',
  precinct: 'Precinct 3'
}, {
  id: 2,
  type: 'Equipment Issue',
  location: 'Riverdale Community Center, Arlington County',
  date: '2023-11-05',
  description: 'Two voting machines are offline due to technical issues.',
  status: 'In Progress',
  county: 'Arlington',
  precinct: 'Precinct 2'
}, {
  id: 3,
  type: 'Not Enough Poll Workers',
  location: 'Alexandria City Hall, Alexandria',
  date: '2023-11-05',
  description: 'Only 2 poll workers present, causing long lines and delays.',
  status: 'Open',
  county: 'Alexandria',
  precinct: 'Precinct 1'
}, {
  id: 4,
  type: 'Voter ID Related',
  location: 'Loudoun County High, Loudoun County',
  date: '2023-11-04',
  description: 'Confusion about acceptable forms of ID, some voters being turned away.',
  status: 'Resolved',
  county: 'Loudoun',
  precinct: 'Precinct 1'
}, {
  id: 5,
  type: 'Polling Location Change',
  location: 'Richmond Convention Center, Richmond City',
  date: '2023-11-03',
  description: 'Location changed from previous elections, causing voter confusion.',
  status: 'Resolved',
  county: 'Richmond City',
  precinct: 'Precinct 2'
}];
const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<typeof sampleResults>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    county: '',
    type: '',
    status: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  // Simulate search results based on query
  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      // For demo purposes, we'll just filter the sample data based on the query
      const filteredResults = sampleResults.filter(result => {
        const searchableText = `${result.type} ${result.location} ${result.description} ${result.county} ${result.precinct}`.toLowerCase();
        return searchableText.includes(query.toLowerCase());
      });
      setResults(filteredResults);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [query]);
  // Apply additional filters
  const filteredResults = results.filter(result => {
    return (filters.county === '' || result.county === filters.county) && (filters.type === '' || result.type === filters.type) && (filters.status === '' || result.status === filters.status);
  });
  // Get unique values for filter options
  const counties = [...new Set(sampleResults.map(r => r.county))];
  const types = [...new Set(sampleResults.map(r => r.type))];
  const statuses = [...new Set(sampleResults.map(r => r.status))];
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const clearFilters = () => {
    setFilters({
      county: '',
      type: '',
      status: ''
    });
  };
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-4 sm:px-0">
            <div className="flex items-center mb-6">
              <Link to="/" className="mr-4 text-blue-600 hover:text-blue-800">
                <ArrowLeftIcon className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                Search Results
              </h1>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <SearchIcon className="h-5 w-5 text-gray-400 mr-2" />
                <p className="text-lg font-medium">
                  Search query: <span className="text-blue-600">"{query}"</span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <p className="text-gray-600 mb-2 sm:mb-0">
                  Found {filteredResults.length} result
                  {filteredResults.length !== 1 ? 's' : ''}
                </p>
                <button onClick={() => setShowFilters(!showFilters)} className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                  <FilterIcon className="h-4 w-4 mr-1" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
              {showFilters && <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-1/3">
                      <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-1">
                        County
                      </label>
                      <select id="county" name="county" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={filters.county} onChange={handleFilterChange}>
                        <option value="">All Counties</option>
                        {counties.map(county => <option key={county} value={county}>
                            {county}
                          </option>)}
                      </select>
                    </div>
                    <div className="sm:w-1/3">
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                        Issue Type
                      </label>
                      <select id="type" name="type" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={filters.type} onChange={handleFilterChange}>
                        <option value="">All Types</option>
                        {types.map(type => <option key={type} value={type}>
                            {type}
                          </option>)}
                      </select>
                    </div>
                    <div className="sm:w-1/3">
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select id="status" name="status" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={filters.status} onChange={handleFilterChange}>
                        <option value="">All Statuses</option>
                        {statuses.map(status => <option key={status} value={status}>
                            {status}
                          </option>)}
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button type="button" onClick={clearFilters} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      Clear Filters
                    </button>
                  </div>
                </div>}
            </div>
            {loading ? <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
                <p className="mt-2 text-gray-600">Loading results...</p>
              </div> : filteredResults.length === 0 ? <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <SearchIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No results found
                </h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search query or filters to find what you're
                  looking for.
                </p>
              </div> : <div className="space-y-4">
                {filteredResults.map(result => <div key={result.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h2 className="text-lg font-medium text-blue-600">
                            {result.type}
                          </h2>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${result.status === 'Open' ? 'bg-red-100 text-red-800' : result.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                            {result.status}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <MapPinIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>{result.location}</p>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <CalendarIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>{new Date(result.date).toLocaleDateString()}</p>
                        </div>
                        <p className="mt-3 text-gray-700">
                          {result.description}
                        </p>
                        <div className="mt-4 flex items-center">
                          <span className="text-xs font-medium text-gray-500 mr-2">
                            County: {result.county}
                          </span>
                          <span className="text-xs font-medium text-gray-500">
                            Precinct: {result.precinct}
                          </span>
                        </div>
                        <div className="mt-4">
                          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>}
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default SearchResultsPage;