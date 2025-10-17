import React, { useEffect, Component } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { PollingPlace } from '../../pages/PollingPlacesPage';
interface PollingPlacesMapProps {
  pollingPlaces: PollingPlace[];
  center: [number, number];
  zoom: number;
}
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
const PollingPlacesMap: React.FC<PollingPlacesMapProps> = ({
  pollingPlaces,
  center,
  zoom
}) => {
  // Determine if a polling place has any recently changed precincts
  const hasRecentlyChangedPrecinct = (pollingPlace: PollingPlace) => {
    return pollingPlace.precincts.some(precinct => precinct.recentlyChanged);
  };
  // Get marker color based on whether there are recently changed precincts
  const getMarkerColor = (pollingPlace: PollingPlace) => {
    return hasRecentlyChangedPrecinct(pollingPlace) ? '#EF4444' : '#10B981';
  };
  // Find the destination polling place for a moved precinct
  const findDestinationPollingPlace = (precinctId: string, currentPlaceId: string) => {
    if (!precinctId || !currentPlaceId) return null;
    // First check if the precinct has a movedTo property
    const currentPlace = pollingPlaces.find(place => place.id === currentPlaceId);
    if (!currentPlace || !currentPlace.removedPrecincts) return null;
    const removedPrecinct = currentPlace.removedPrecincts.find(p => p.id === precinctId);
    if (removedPrecinct && removedPrecinct.movedTo) {
      // If we have a direct reference to where it was moved
      return pollingPlaces.find(place => place.id === removedPrecinct.movedTo);
    }
    // Fallback: Look for the precinct in other polling places
    for (const place of pollingPlaces) {
      if (place.id !== currentPlaceId) {
        const foundPrecinct = place.precincts.find(p => p.id === precinctId && p.recentlyChanged);
        if (foundPrecinct) {
          return place;
        }
      }
    }
    return null;
  };
  return <div className="h-[500px] w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
      <MapContainer center={center} zoom={zoom} style={{
      height: '100%',
      width: '100%'
    }} zoomControl={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ZoomControl position="bottomright" />
        <MapViewControl center={center} zoom={zoom} />
        {pollingPlaces.map(pollingPlace => <CircleMarker key={pollingPlace.id} center={[pollingPlace.lat, pollingPlace.lng]} radius={hasRecentlyChangedPrecinct(pollingPlace) ? 12 : 8} pathOptions={{
        fillColor: getMarkerColor(pollingPlace),
        fillOpacity: 0.7,
        color: getMarkerColor(pollingPlace),
        weight: 1
      }}>
            <Popup>
              <div className="p-1">
                <h3 className="font-medium">{pollingPlace.name}</h3>
                <p className="text-xs text-gray-600">{pollingPlace.address}</p>
                <p className="text-xs mt-1">
                  <span className="font-medium">County:</span>{' '}
                  {pollingPlace.county}
                </p>
                <div className="mt-2">
                  <p className="text-xs font-medium">Assigned Precincts:</p>
                  <ul className="mt-1 space-y-1">
                    {pollingPlace.precincts.map(precinct => <li key={precinct.id} className="text-xs flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-1 ${precinct.recentlyChanged ? 'bg-red-500' : 'bg-green-500'}`}></span>
                        {precinct.name}
                        {precinct.recentlyChanged && <span className="ml-1 text-xs text-red-600 font-medium">
                            (Recently Changed)
                          </span>}
                      </li>)}
                  </ul>
                </div>
                {/* Show information about precincts moved from this location */}
                {pollingPlace.removedPrecincts && pollingPlace.removedPrecincts.length > 0 && <div className="mt-2">
                      <p className="text-xs font-medium text-red-600">
                        Precincts Moved Away:
                      </p>
                      <ul className="mt-1 space-y-1">
                        {pollingPlace.removedPrecincts.map(precinct => {
                  // Try to find where this precinct was moved to
                  const destination = findDestinationPollingPlace(precinct.id, pollingPlace.id);
                  return <li key={precinct.id} className="text-xs flex flex-col">
                              <div className="flex items-center">
                                <span className="w-2 h-2 rounded-full mr-1 bg-red-500"></span>
                                {precinct.name}
                              </div>
                              {destination ? <span className="ml-3 text-xs text-gray-600">
                                  Moved to: {destination.name}
                                </span> : <span className="ml-3 text-xs text-gray-600">
                                  Moved to another location
                                </span>}
                            </li>;
                })}
                      </ul>
                    </div>}
              </div>
            </Popup>
          </CircleMarker>)}
      </MapContainer>
    </div>;
};
export default PollingPlacesMap;