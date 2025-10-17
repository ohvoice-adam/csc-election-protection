import React from 'react';
import { MapPinIcon, AlertCircleIcon } from 'lucide-react';
import { PollingPlace } from '../../pages/PollingPlacesPage';
interface PollingPlacesListProps {
  pollingPlaces: PollingPlace[];
}
const PollingPlacesList: React.FC<PollingPlacesListProps> = ({
  pollingPlaces
}) => {
  // Determine if a polling place has any recently changed precincts
  const hasRecentlyChangedPrecinct = (pollingPlace: PollingPlace) => {
    return pollingPlace.precincts.some(precinct => precinct.recentlyChanged);
  };
  // Count number of recently changed precincts
  const countRecentlyChangedPrecincts = (pollingPlace: PollingPlace) => {
    return pollingPlace.precincts.filter(precinct => precinct.recentlyChanged).length;
  };
  return <div className="space-y-4">
      {pollingPlaces.length === 0 ? <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-md">
          No polling places found with the selected filters.
        </div> : pollingPlaces.map(pollingPlace => <div key={pollingPlace.id} className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors ${hasRecentlyChangedPrecinct(pollingPlace) ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'} shadow-md`}>
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${hasRecentlyChangedPrecinct(pollingPlace) ? 'bg-red-100' : 'bg-blue-100'}`}>
                  <MapPinIcon className={`h-5 w-5 ${hasRecentlyChangedPrecinct(pollingPlace) ? 'text-red-600' : 'text-blue-600'}`} aria-hidden="true" />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {pollingPlace.name}
                  </h3>
                  {hasRecentlyChangedPrecinct(pollingPlace) && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <AlertCircleIcon className="h-3 w-3 mr-1" />
                      Recently Changed
                    </span>}
                </div>
                <p className="text-sm text-gray-500">{pollingPlace.address}</p>
                <div className="mt-1">
                  <span className="text-sm text-gray-500">
                    {pollingPlace.county}, ZIP: {pollingPlace.zipCode}
                  </span>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">
                    Assigned Precincts:
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {pollingPlace.precincts.map(precinct => <li key={precinct.id} className="flex items-center">
                        <span className={`w-3 h-3 rounded-full mr-2 ${precinct.recentlyChanged ? 'bg-red-500' : 'bg-green-500'}`}></span>
                        <span className="text-sm">
                          {precinct.name}
                          {precinct.recentlyChanged && <span className="ml-2 text-xs text-red-600 font-medium inline-block px-2 py-0.5 bg-red-50 rounded-full">
                              Recently Changed
                            </span>}
                        </span>
                      </li>)}
                  </ul>
                </div>
                {hasRecentlyChangedPrecinct(pollingPlace) && <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-800 flex items-start">
                      <AlertCircleIcon className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Attention:</strong>{' '}
                        {countRecentlyChangedPrecincts(pollingPlace)} precinct
                        {countRecentlyChangedPrecincts(pollingPlace) !== 1 ? 's' : ''}{' '}
                        assigned to this polling place{' '}
                        {countRecentlyChangedPrecincts(pollingPlace) !== 1 ? 'have' : 'has'}{' '}
                        recently changed. Voters in these precincts should be
                        notified.
                      </span>
                    </p>
                  </div>}
                <div className="mt-3 flex space-x-4">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Get Directions
                  </button>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>)}
    </div>;
};
export default PollingPlacesList;