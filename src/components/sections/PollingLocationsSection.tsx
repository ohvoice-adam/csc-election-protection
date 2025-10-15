import React, { useEffect, useState, useRef, Component } from 'react';
import { MapPinIcon, ClockIcon, InfoIcon, FilterIcon, ZoomInIcon, ZoomOutIcon, CheckCircleIcon, XCircleIcon, ClipboardListIcon } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// Virginia counties and precincts (simplified for demo)
const virginiaCounties = ['Fairfax', 'Arlington', 'Alexandria', 'Loudoun', 'Prince William', 'Henrico', 'Chesterfield', 'Richmond City', 'Virginia Beach', 'Norfolk', 'Chesapeake', 'Newport News', 'Hampton', 'Roanoke', 'Lynchburg'];
const precinctsByCounty: Record<string, string[]> = {
  Fairfax: ['Precinct 1', 'Precinct 2', 'Precinct 3', 'Precinct 4'],
  Arlington: ['Precinct 1', 'Precinct 2', 'Precinct 3'],
  Alexandria: ['Precinct 1', 'Precinct 2'],
  Loudoun: ['Precinct 1', 'Precinct 2', 'Precinct 3'],
  'Prince William': ['Precinct 1', 'Precinct 2', 'Precinct 3'],
  Henrico: ['Precinct 1', 'Precinct 2', 'Precinct 3'],
  Chesterfield: ['Precinct 1', 'Precinct 2'],
  'Richmond City': ['Precinct 1', 'Precinct 2', 'Precinct 3', 'Precinct 4'],
  'Virginia Beach': ['Precinct 1', 'Precinct 2', 'Precinct 3'],
  Norfolk: ['Precinct 1', 'Precinct 2'],
  Chesapeake: ['Precinct 1', 'Precinct 2'],
  'Newport News': ['Precinct 1', 'Precinct 2'],
  Hampton: ['Precinct 1', 'Precinct 2'],
  Roanoke: ['Precinct 1', 'Precinct 2'],
  Lynchburg: ['Precinct 1', 'Precinct 2']
};
// Sample polling locations with coordinates (approximate for Virginia)
const pollingLocations = [{
  id: 1,
  name: 'Fairfax High School',
  address: '123 Main St, Fairfax, VA',
  county: 'Fairfax',
  precinct: 'Precinct 1',
  incidents: 12,
  status: 'issue',
  lat: 38.846,
  lng: -77.306
}, {
  id: 2,
  name: 'Arlington Community Center',
  address: '456 Oak Ave, Arlington, VA',
  county: 'Arlington',
  precinct: 'Precinct 2',
  incidents: 3,
  status: 'ok',
  lat: 38.88,
  lng: -77.106
}, {
  id: 3,
  name: 'Alexandria City Hall',
  address: '789 Gov Pl, Alexandria, VA',
  county: 'Alexandria',
  precinct: 'Precinct 1',
  incidents: 7,
  status: 'issue',
  lat: 38.804,
  lng: -77.047
}, {
  id: 4,
  name: 'Loudoun County High',
  address: '234 School Ln, Leesburg, VA',
  county: 'Loudoun',
  precinct: 'Precinct 1',
  incidents: 1,
  status: 'ok',
  lat: 39.116,
  lng: -77.564
}, {
  id: 5,
  name: 'Prince William Library',
  address: '567 Read Rd, Manassas, VA',
  county: 'Prince William',
  precinct: 'Precinct 2',
  incidents: 5,
  status: 'ok',
  lat: 38.751,
  lng: -77.475
}, {
  id: 6,
  name: 'Henrico Recreation Center',
  address: '890 Play Dr, Henrico, VA',
  county: 'Henrico',
  precinct: 'Precinct 3',
  incidents: 0,
  status: 'ok',
  lat: 37.54,
  lng: -77.469
}, {
  id: 7,
  name: 'Chesterfield Elementary',
  address: '123 Learn St, Chesterfield, VA',
  county: 'Chesterfield',
  precinct: 'Precinct 1',
  incidents: 8,
  status: 'issue',
  lat: 37.376,
  lng: -77.578
}, {
  id: 8,
  name: 'Richmond Convention Center',
  address: '456 Event Blvd, Richmond, VA',
  county: 'Richmond City',
  precinct: 'Precinct 2',
  incidents: 15,
  status: 'issue',
  lat: 37.541,
  lng: -77.436
}, {
  id: 9,
  name: 'Virginia Beach Oceanfront',
  address: '789 Beach Dr, Virginia Beach, VA',
  county: 'Virginia Beach',
  precinct: 'Precinct 3',
  incidents: 2,
  status: 'ok',
  lat: 36.852,
  lng: -75.977
}, {
  id: 10,
  name: 'Norfolk State University',
  address: '234 College Ave, Norfolk, VA',
  county: 'Norfolk',
  precinct: 'Precinct 1',
  incidents: 4,
  status: 'ok',
  lat: 36.849,
  lng: -76.261
}, {
  id: 11,
  name: 'Chesapeake City Hall',
  address: '567 Gov Ctr, Chesapeake, VA',
  county: 'Chesapeake',
  precinct: 'Precinct 2',
  incidents: 6,
  status: 'issue',
  lat: 36.768,
  lng: -76.287
}, {
  id: 12,
  name: 'Newport News High School',
  address: '890 Education Ln, Newport News, VA',
  county: 'Newport News',
  precinct: 'Precinct 1',
  incidents: 1,
  status: 'ok',
  lat: 37.087,
  lng: -76.473
}, {
  id: 13,
  name: 'Hampton Community Center',
  address: '123 Community Dr, Hampton, VA',
  county: 'Hampton',
  precinct: 'Precinct 2',
  incidents: 0,
  status: 'ok',
  lat: 37.03,
  lng: -76.345
}, {
  id: 14,
  name: 'Roanoke Library',
  address: '456 Book St, Roanoke, VA',
  county: 'Roanoke',
  precinct: 'Precinct 1',
  incidents: 9,
  status: 'issue',
  lat: 37.271,
  lng: -79.942
}, {
  id: 15,
  name: 'Lynchburg College',
  address: '789 College Dr, Lynchburg, VA',
  county: 'Lynchburg',
  precinct: 'Precinct 2',
  incidents: 3,
  status: 'ok',
  lat: 37.404,
  lng: -79.182
}];
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
const PollingLocationsSection: React.FC = () => {
  const [zipCode, setZipCode] = useState('');
  const [showLocations, setShowLocations] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState<string>('');
  const [selectedPrecinct, setSelectedPrecinct] = useState<string>('');
  const [availablePrecincts, setAvailablePrecincts] = useState<string[]>([]);
  const [filteredLocations, setFilteredLocations] = useState(pollingLocations);
  const [mapCenter, setMapCenter] = useState<[number, number]>([37.7, -78.2]); // Center of Virginia
  const [mapZoom, setMapZoom] = useState(7);
  const [showMap, setShowMap] = useState(true);
  const [showList, setShowList] = useState(true);
  // Update available precincts when county changes
  useEffect(() => {
    if (selectedCounty) {
      setAvailablePrecincts(precinctsByCounty[selectedCounty] || []);
    } else {
      setAvailablePrecincts([]);
    }
    setSelectedPrecinct('');
  }, [selectedCounty]);
  // Filter locations based on selections
  useEffect(() => {
    let filtered = pollingLocations;
    if (selectedCounty) {
      filtered = filtered.filter(location => location.county === selectedCounty);
      // Find center point of this county's locations
      const countyLocations = filtered;
      if (countyLocations.length > 0) {
        const avgLat = countyLocations.reduce((sum, loc) => sum + loc.lat, 0) / countyLocations.length;
        const avgLng = countyLocations.reduce((sum, loc) => sum + loc.lng, 0) / countyLocations.length;
        setMapCenter([avgLat, avgLng]);
        setMapZoom(10); // Zoom in when county is selected
      }
      if (selectedPrecinct) {
        filtered = filtered.filter(location => location.precinct === selectedPrecinct);
        setMapZoom(13); // Zoom in further when precinct is selected
      }
    } else {
      setMapCenter([37.7, -78.2]); // Reset to Virginia center
      setMapZoom(7);
    }
    setFilteredLocations(filtered);
  }, [selectedCounty, selectedPrecinct]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLocations(true);
  };
  const getMarkerColor = (status: string) => {
    return status === 'ok' ? '#10B981' : '#EF4444';
  };
  const getMarkerRadius = (incidents: number) => {
    // Scale the radius based on incident count (min 6, max 20)
    return Math.max(6, Math.min(20, 6 + incidents));
  };
  return <section id="polling-locations" className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Polling Locations
      </h2>
      <p className="text-gray-600 mb-6">
        Find polling locations near you and check their current status.
      </p>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-2 sm:w-1/3">
          <label htmlFor="county" className="block text-sm font-medium text-gray-700">
            County
          </label>
          <select id="county" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={selectedCounty} onChange={e => setSelectedCounty(e.target.value)}>
            <option value="">All Counties</option>
            {virginiaCounties.map(county => <option key={county} value={county}>
                {county}
              </option>)}
          </select>
        </div>
        <div className="flex flex-col gap-2 sm:w-1/3">
          <label htmlFor="precinct" className="block text-sm font-medium text-gray-700">
            Precinct
          </label>
          <select id="precinct" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={selectedPrecinct} onChange={e => setSelectedPrecinct(e.target.value)} disabled={!selectedCounty}>
            <option value="">All Precincts</option>
            {availablePrecincts.map(precinct => <option key={precinct} value={precinct}>
                {precinct}
              </option>)}
          </select>
        </div>
        <div className="flex flex-col gap-2 sm:w-1/3">
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
            ZIP Code
          </label>
          <div className="flex">
            <input type="text" id="zip" className="block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter ZIP code" value={zipCode} onChange={e => setZipCode(e.target.value)} pattern="[0-9]{5}" title="Five digit zip code" />
            <button type="button" onClick={handleSubmit} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Go
            </button>
          </div>
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => setShowMap(!showMap)} className={`inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded-md ${showMap ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>
          <MapPinIcon className="h-4 w-4 mr-1" />
          Map View
        </button>
        <button type="button" onClick={() => setShowList(!showList)} className={`inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded-md ${showList ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>
          <ClipboardListIcon className="h-4 w-4 mr-1" />
          List View
        </button>
      </div>
      <div className="flex flex-col gap-6">
        {showMap && <div className="h-[400px] w-full border border-gray-300 rounded-lg overflow-hidden">
            <MapContainer center={mapCenter} zoom={mapZoom} style={{
          height: '100%',
          width: '100%'
        }} zoomControl={false}>
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <ZoomControl position="bottomright" />
              <MapViewControl center={mapCenter} zoom={mapZoom} />
              {filteredLocations.map(location => <CircleMarker key={location.id} center={[location.lat, location.lng]} radius={getMarkerRadius(location.incidents)} pathOptions={{
            fillColor: getMarkerColor(location.status),
            fillOpacity: 0.7,
            color: getMarkerColor(location.status),
            weight: 1
          }}>
                  <Popup>
                    <div className="p-1">
                      <h3 className="font-medium">{location.name}</h3>
                      <p className="text-xs text-gray-600">
                        {location.address}
                      </p>
                      <p className="text-xs mt-1">
                        <span className="font-medium">County:</span>{' '}
                        {location.county},{' '}
                        <span className="font-medium">Precinct:</span>{' '}
                        {location.precinct}
                      </p>
                      <p className="text-xs mt-1">
                        <span className="font-medium">Incidents Reported:</span>{' '}
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
                    </div>
                  </Popup>
                </CircleMarker>)}
            </MapContainer>
          </div>}
        {showList && <div className="space-y-4">
            {filteredLocations.length === 0 ? <div className="text-center py-8 text-gray-500">
                No polling locations found with the selected filters.
              </div> : filteredLocations.map(location => <div key={location.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center ${location.status === 'ok' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {location.status === 'ok' ? <CheckCircleIcon className="h-5 w-5 text-green-600" aria-hidden="true" /> : <XCircleIcon className="h-5 w-5 text-red-600" aria-hidden="true" />}
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {location.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {location.address}
                      </p>
                      <div className="mt-1">
                        <span className="text-sm text-gray-500">
                          {location.county}, {location.precinct}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center">
                        <ClockIcon className="h-4 w-4 text-gray-400 mr-1" aria-hidden="true" />
                        <span className="text-sm text-gray-500">
                          Open 7:00 AM - 8:00 PM
                        </span>
                      </div>
                      <div className="mt-1">
                        {location.status === 'ok' ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Operating normally
                          </span> : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {location.incidents} incident
                            {location.incidents !== 1 ? 's' : ''} reported
                          </span>}
                      </div>
                      {location.status !== 'ok' && <div className="mt-2 flex items-start">
                          <InfoIcon className="h-4 w-4 text-yellow-500 mr-1 mt-0.5" aria-hidden="true" />
                          <span className="text-sm text-gray-500">
                            Issues reported at this location. Staff has been
                            notified.
                          </span>
                        </div>}
                      <div className="mt-3">
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                          Get Directions
                        </button>
                        <button className="ml-4 text-sm font-medium text-blue-600 hover:text-blue-500">
                          Report an Issue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>)}
          </div>}
      </div>
    </section>;
};
export default PollingLocationsSection;