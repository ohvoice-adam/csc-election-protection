import React, { useEffect, useState, Component } from 'react';
import { MapPinIcon, ClockIcon, InfoIcon, FilterIcon, CheckCircleIcon, XCircleIcon, AlertTriangleIcon, SearchIcon } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { PollingPlace } from '../../pages/PollingPlacesPage';
import { extendedPollingPlacesData, extendedIncidentData } from '../../data/extendedPollingPlacesData';
// Import the Link component from react-router-dom
import { Link } from 'react-router-dom';
// Component to handle map view changes
const MapViewControl = ({
  center,
  zoom
}: {
  center: [number, number];
  zoom: number;
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
};
const AdminMapView: React.FC = () => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([37.7, -78.2]); // Center of Virginia
  const [mapZoom, setMapZoom] = useState(7);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'incidents' | 'precincts'>('incidents');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [incidentTypeFilter, setIncidentTypeFilter] = useState<string>('');
  const [countyFilter, setCountyFilter] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  // Get all counties from both datasets
  const allCounties = Array.from(new Set([...extendedIncidentData.map(loc => loc.county), ...extendedPollingPlacesData.map(place => place.county)])).sort();
  // All incident types from the incident data
  const allIncidentTypes = Array.from(new Set(extendedIncidentData.flatMap(location => location.incidentTypes).filter(type => type))).sort();
  // Determine which locations to display based on view mode
  const [displayedLocations, setDisplayedLocations] = useState<any[]>(extendedIncidentData);
  // Filter locations based on search, filters, and view mode
  useEffect(() => {
    let filtered = viewMode === 'incidents' ? extendedIncidentData : extendedPollingPlacesData;
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(location => location.name.toLowerCase().includes(term) || location.address.toLowerCase().includes(term) || location.county.toLowerCase().includes(term));
    }
    // Apply county filter
    if (countyFilter) {
      filtered = filtered.filter(location => location.county === countyFilter);
    }
    // Apply view-specific filters
    if (viewMode === 'incidents') {
      // Apply status filter
      if (statusFilter) {
        filtered = filtered.filter(location => {
          if (statusFilter === 'issue') return location.status === 'issue';
          if (statusFilter === 'ok') return location.status === 'ok';
          return true;
        });
      }
      // Apply incident type filter
      if (incidentTypeFilter) {
        filtered = filtered.filter(location => location.incidentTypes.includes(incidentTypeFilter));
      }
    } else {
      // For precincts view, filter to show only locations with removed precincts if selected
      if (statusFilter === 'removed') {
        filtered = filtered.filter(location => location.hasRemovedPrecinct);
      }
    }
    setDisplayedLocations(filtered);
  }, [searchTerm, statusFilter, incidentTypeFilter, countyFilter, viewMode]);
  const getMarkerColor = (location: any) => {
    if (viewMode === 'incidents') {
      return location.status === 'ok' ? '#10B981' : '#EF4444';
    } else {
      return location.hasRemovedPrecinct ? '#EF4444' : '#10B981';
    }
  };
  const getMarkerRadius = (location: any) => {
    if (viewMode === 'incidents') {
      // Scale the radius based on incident count (min 6, max 20)
      return Math.max(6, Math.min(20, 6 + location.incidents));
    } else {
      return location.hasRemovedPrecinct ? 12 : 8;
    }
  };
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Polling Places Map</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and monitor polling locations across the state.
        </p>
      </div>
      {/* View Mode Toggle */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="mb-4">
          <label htmlFor="viewMode" className="block text-sm font-medium text-gray-700 mb-1">
            View Mode
          </label>
          <select id="viewMode" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" value={viewMode} onChange={e => setViewMode(e.target.value as 'incidents' | 'precincts')}>
            <option value="incidents">Incident Reports</option>
            <option value="precincts">Precinct Assignments</option>
          </select>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" placeholder="Search locations..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <select className="block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" value={countyFilter} onChange={e => setCountyFilter(e.target.value)}>
              <option value="">All Counties</option>
              {allCounties.map(county => <option key={county} value={county}>
                  {county}
                </option>)}
            </select>
            {viewMode === 'incidents' ? <>
                <select className="block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="">All Statuses</option>
                  <option value="ok">Operating Normally</option>
                  <option value="issue">Issues Reported</option>
                </select>
                <select className="block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" value={incidentTypeFilter} onChange={e => setIncidentTypeFilter(e.target.value)}>
                  <option value="">All Incident Types</option>
                  {allIncidentTypes.map(type => <option key={type} value={type}>
                      {type}
                    </option>)}
                </select>
              </> : <select className="block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#235280] focus:border-[#235280] sm:text-sm" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="">All Precincts</option>
                <option value="removed">Precincts Removed</option>
              </select>}
          </div>
        </div>
      </div>
      {/* Map */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="h-[500px] w-full">
          <MapContainer center={mapCenter} zoom={mapZoom} style={{
          height: '100%',
          width: '100%'
        }} zoomControl={false}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ZoomControl position="bottomright" />
            <MapViewControl center={mapCenter} zoom={mapZoom} />
            {displayedLocations.map(location => <CircleMarker key={location.id} center={[location.lat, location.lng]} radius={getMarkerRadius(location)} pathOptions={{
            fillColor: getMarkerColor(location),
            fillOpacity: 0.7,
            color: getMarkerColor(location),
            weight: 1
          }} eventHandlers={{
            click: () => {
              setSelectedLocation(location.id);
            }
          }}>
                <Popup>
                  <div className="p-1">
                    <h3 className="font-medium">{location.name}</h3>
                    <p className="text-xs text-gray-600">{location.address}</p>
                    <p className="text-xs mt-1">
                      <span className="font-medium">County:</span>{' '}
                      {location.county}
                    </p>
                    {viewMode === 'incidents' ? <>
                        <p className="text-xs mt-1">
                          <span className="font-medium">
                            Incidents Reported:
                          </span>{' '}
                          {location.incidents}
                        </p>
                        <p className="text-xs mt-1 flex items-center">
                          <span className="font-medium mr-1">Status:</span>
                          {location.status === 'ok' ? <span className="flex items-center text-green-600">
                              <CheckCircleIcon className="h-3 w-3 mr-1" />
                              Operating Normally
                            </span> : <span className="flex items-center text-red-600">
                              <XCircleIcon className="h-3 w-3 mr-1" />
                              Issues Reported
                            </span>}
                        </p>
                        {location.incidentTypes && location.incidentTypes.length > 0 && <div className="mt-1">
                              <span className="text-xs font-medium">
                                Incident Types:
                              </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {location.incidentTypes.map((type: string, index: number) => <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                      {type}
                                    </span>)}
                              </div>
                            </div>}
                      </> : <>
                        <div className="mt-2">
                          <p className="text-xs font-medium">
                            Assigned Precincts:
                          </p>
                          <ul className="mt-1 space-y-1">
                            {location.precincts && location.precincts.map((precinct: any) => <li key={precinct.id} className="text-xs flex items-center">
                                  <span className="w-2 h-2 rounded-full mr-1 bg-green-500"></span>
                                  {precinct.name}
                                </li>)}
                          </ul>
                        </div>
                        {location.hasRemovedPrecinct && <div className="mt-2">
                            <p className="text-xs font-medium text-red-600">
                              Removed Precincts:
                            </p>
                            <ul className="mt-1 space-y-1">
                              {location.removedPrecincts && location.removedPrecincts.map((precinct: any) => {
                        const destination = precinct.movedTo ? extendedPollingPlacesData.find(p => p.id === precinct.movedTo) : null;
                        return <li key={precinct.id} className="text-xs flex flex-col">
                                        <div className="flex items-center">
                                          <span className="w-2 h-2 rounded-full mr-1 bg-red-500"></span>
                                          {precinct.name}
                                          <span className="ml-1 text-xs text-red-600 font-medium">
                                            (Removed)
                                          </span>
                                        </div>
                                        {destination && <span className="ml-3 text-xs text-gray-600">
                                            Moved to: {destination.name}
                                          </span>}
                                      </li>;
                      })}
                            </ul>
                          </div>}
                      </>}
                    <div className="mt-2 pt-1 border-t border-gray-200">
                      <Link to={`/polling-place/${location.id}`} className="text-xs text-blue-600 hover:text-blue-800">
                        View Details
                      </Link>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>)}
          </MapContainer>
        </div>
      </div>
      {/* Location List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {viewMode === 'incidents' ? 'Incident Reports' : 'Polling Locations'}
          </h3>
          <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    County
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {viewMode === 'incidents' ? 'Status' : 'Precinct Changes'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {viewMode === 'incidents' ? 'Incidents' : 'Total Precincts'}
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayedLocations.slice(0, 5).map(location => <tr key={location.id} className={selectedLocation === location.id ? 'bg-blue-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {location.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {location.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {location.county}
                      </div>
                      {viewMode === 'incidents' && <div className="text-sm text-gray-500">
                          {location.precinct}
                        </div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {viewMode === 'incidents' ? location.status === 'ok' ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Operating Normally
                          </span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Issues Reported
                          </span> : location.hasRemovedPrecinct ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Precincts Removed
                        </span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          No Changes
                        </span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {viewMode === 'incidents' ? location.incidents : location.precincts ? location.precincts.length : 0}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <Link to={`/polling-place/${location.id}`} className="text-xs text-blue-600 hover:text-blue-800">
                        View Details
                      </Link>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
          {displayedLocations.length > 5 && <div className="mt-4 text-center">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View All {displayedLocations.length} Locations
              </button>
            </div>}
        </div>
      </div>
      {/* Legend */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Map Legend</h3>
        <div className="flex flex-wrap gap-4">
          {viewMode === 'incidents' ? <>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-[#10B981] mr-2"></div>
                <span className="text-sm text-gray-600">
                  Operating Normally
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-[#EF4444] mr-2"></div>
                <span className="text-sm text-gray-600">Issues Reported</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-1"></div>
                <div className="w-6 h-6 rounded-full mr-1"></div>
                <span className="text-sm text-gray-600">
                  Circle size indicates number of incidents
                </span>
              </div>
            </> : <>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-[#10B981] mr-2"></div>
                <span className="text-sm text-gray-600">
                  Normal Precinct Assignment
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-[#EF4444] mr-2"></div>
                <span className="text-sm text-gray-600">Precincts Removed</span>
              </div>
            </>}
        </div>
      </div>
    </div>;
};
export default AdminMapView;