import React from 'react';
import { MapPinIcon, ClipboardListIcon } from 'lucide-react';
interface PollingPlacesSearchProps {
  counties: string[];
  selectedCounty: string;
  zipCode: string;
  onCountyChange: (county: string) => void;
  onZipCodeChange: (zipCode: string) => void;
  onZipCodeSubmit: () => void;
  showMap: boolean;
  showList: boolean;
  onToggleMap: () => void;
  onToggleList: () => void;
}
const PollingPlacesSearch: React.FC<PollingPlacesSearchProps> = ({
  counties,
  selectedCounty,
  zipCode,
  onCountyChange,
  onZipCodeChange,
  onZipCodeSubmit,
  showMap,
  showList,
  onToggleMap,
  onToggleList
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onZipCodeSubmit();
  };
  return <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Search Polling Places
      </h2>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-2 sm:w-1/2">
          <label htmlFor="county" className="block text-sm font-medium text-gray-700">
            County
          </label>
          <select id="county" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" value={selectedCounty} onChange={e => onCountyChange(e.target.value)}>
            <option value="">All Counties</option>
            {counties.map(county => <option key={county} value={county}>
                {county}
              </option>)}
          </select>
        </div>
        <div className="flex flex-col gap-2 sm:w-1/2">
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
            ZIP Code
          </label>
          <div className="flex">
            <input type="text" id="zip" className="block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" placeholder="Enter ZIP code" value={zipCode} onChange={e => onZipCodeChange(e.target.value)} pattern="[0-9]{5}" title="Five digit zip code" />
            <button type="button" onClick={handleSubmit} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-[#235280] hover:bg-[#1e456e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235280]">
              Go
            </button>
          </div>
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <button type="button" onClick={onToggleMap} className={`inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded-md ${showMap ? 'bg-[#235280] bg-opacity-10 text-[#235280] border-[#235280]' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>
          <MapPinIcon className="h-4 w-4 mr-1" />
          Map View
        </button>
        <button type="button" onClick={onToggleList} className={`inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded-md ${showList ? 'bg-[#235280] bg-opacity-10 text-[#235280] border-[#235280]' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>
          <ClipboardListIcon className="h-4 w-4 mr-1" />
          List View
        </button>
      </div>
      <div className="p-3 bg-[#803e5f] bg-opacity-10 border border-[#803e5f] border-opacity-20 rounded-md">
        <p className="text-sm text-[#571e3a]">
          <strong>Note:</strong> Polling places with recently changed precinct
          assignments are highlighted.
        </p>
      </div>
    </div>;
};
export default PollingPlacesSearch;