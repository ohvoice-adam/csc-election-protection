import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PollingPlacesSearch from '../components/sections/PollingPlacesSearch';
import PollingPlacesMap from '../components/sections/PollingPlacesMap';
import PollingPlacesList from '../components/sections/PollingPlacesList';
import { extendedPollingPlacesData } from '../data/extendedPollingPlacesData';
export interface Precinct {
  id: string;
  name: string;
  recentlyChanged: boolean;
}
export interface PollingPlace {
  id: string;
  name: string;
  address: string;
  county: string;
  zipCode: string;
  lat: number;
  lng: number;
  precincts: Precinct[];
}
const PollingPlacesPage: React.FC = () => {
  const [pollingPlaces, setPollingPlaces] = useState<PollingPlace[]>(extendedPollingPlacesData);
  const [filteredPollingPlaces, setFilteredPollingPlaces] = useState<PollingPlace[]>(extendedPollingPlacesData);
  const [selectedCounty, setSelectedCounty] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([37.7, -78.2]); // Center of Virginia
  const [mapZoom, setMapZoom] = useState(7);
  const [showMap, setShowMap] = useState(true);
  const [showList, setShowList] = useState(true);
  // Get unique counties for the dropdown
  const counties = [...new Set(extendedPollingPlacesData.map(place => place.county))].sort();
  // Filter polling places based on search criteria
  useEffect(() => {
    let filtered = extendedPollingPlacesData;
    if (selectedCounty) {
      filtered = filtered.filter(place => place.county === selectedCounty);
      // Find center point of this county's locations
      const countyLocations = filtered;
      if (countyLocations.length > 0) {
        const avgLat = countyLocations.reduce((sum, loc) => sum + loc.lat, 0) / countyLocations.length;
        const avgLng = countyLocations.reduce((sum, loc) => sum + loc.lng, 0) / countyLocations.length;
        setMapCenter([avgLat, avgLng]);
        setMapZoom(10); // Zoom in when county is selected
      }
    }
    if (zipCode) {
      filtered = filtered.filter(place => place.zipCode === zipCode);
      if (filtered.length > 0) {
        setMapCenter([filtered[0].lat, filtered[0].lng]);
        setMapZoom(13); // Zoom in further when zip code is selected
      }
    }
    if (!selectedCounty && !zipCode) {
      setMapCenter([37.7, -78.2]); // Reset to Virginia center
      setMapZoom(7);
    }
    setFilteredPollingPlaces(filtered);
  }, [selectedCounty, zipCode]);
  const handleCountyChange = (county: string) => {
    setSelectedCounty(county);
    setZipCode(''); // Reset zip code when county changes
  };
  const handleZipCodeChange = (zip: string) => {
    setZipCode(zip);
  };
  const handleZipCodeSubmit = () => {
    // If needed, perform additional validation or processing here
    // For now, the useEffect will handle filtering
  };
  const toggleMapView = () => {
    setShowMap(!showMap);
  };
  const toggleListView = () => {
    setShowList(!showList);
  };
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Polling Places & Precincts
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Find polling places and their assigned precincts. Recently
                changed precinct assignments are highlighted.
              </p>
            </div>
            <PollingPlacesSearch counties={counties} selectedCounty={selectedCounty} zipCode={zipCode} onCountyChange={handleCountyChange} onZipCodeChange={handleZipCodeChange} onZipCodeSubmit={handleZipCodeSubmit} showMap={showMap} showList={showList} onToggleMap={toggleMapView} onToggleList={toggleListView} />
            <div className="flex flex-col gap-6 mt-6">
              {showMap && <PollingPlacesMap pollingPlaces={filteredPollingPlaces} center={mapCenter} zoom={mapZoom} />}
              {showList && <PollingPlacesList pollingPlaces={filteredPollingPlaces} />}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default PollingPlacesPage;