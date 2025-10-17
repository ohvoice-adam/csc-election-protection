import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FilterIcon, ZoomInIcon, ZoomOutIcon, RefreshCwIcon } from 'lucide-react';
// Mock Virginia GeoJSON data - in a real app, this would be loaded from a file
const mockVirginiaGeoJSON = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: {
      PRECINCT_ID: 'F01',
      NAME: 'Fairfax Precinct 1',
      COUNTY: 'Fairfax',
      avgScore: 0.87,
      totalVoters: 1254,
      demographics: {
        white: 65,
        black: 15,
        hispanic: 10,
        asian: 8,
        other: 2,
        male: 48,
        female: 52
      }
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[[-77.3, 38.8], [-77.2, 38.8], [-77.2, 38.9], [-77.3, 38.9], [-77.3, 38.8]]]
    }
  }, {
    type: 'Feature',
    properties: {
      PRECINCT_ID: 'A01',
      NAME: 'Arlington Precinct 1',
      COUNTY: 'Arlington',
      avgScore: 0.92,
      totalVoters: 987,
      demographics: {
        white: 55,
        black: 20,
        hispanic: 15,
        asian: 8,
        other: 2,
        male: 46,
        female: 54
      }
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[[-77.1, 38.9], [-77.0, 38.9], [-77.0, 39.0], [-77.1, 39.0], [-77.1, 38.9]]]
    }
  }, {
    type: 'Feature',
    properties: {
      PRECINCT_ID: 'R01',
      NAME: 'Richmond Precinct 1',
      COUNTY: 'Richmond City',
      avgScore: 0.76,
      totalVoters: 1532,
      demographics: {
        white: 45,
        black: 40,
        hispanic: 8,
        asian: 5,
        other: 2,
        male: 47,
        female: 53
      }
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[[-77.5, 37.5], [-77.4, 37.5], [-77.4, 37.6], [-77.5, 37.6], [-77.5, 37.5]]]
    }
  }, {
    type: 'Feature',
    properties: {
      PRECINCT_ID: 'N01',
      NAME: 'Norfolk Precinct 1',
      COUNTY: 'Norfolk',
      avgScore: 0.68,
      totalVoters: 1123,
      demographics: {
        white: 48,
        black: 42,
        hispanic: 5,
        asian: 3,
        other: 2,
        male: 45,
        female: 55
      }
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[[-76.3, 36.8], [-76.2, 36.8], [-76.2, 36.9], [-76.3, 36.9], [-76.3, 36.8]]]
    }
  }, {
    type: 'Feature',
    properties: {
      PRECINCT_ID: 'VB01',
      NAME: 'Virginia Beach Precinct 1',
      COUNTY: 'Virginia Beach',
      avgScore: 0.81,
      totalVoters: 1876,
      demographics: {
        white: 68,
        black: 20,
        hispanic: 7,
        asian: 3,
        other: 2,
        male: 49,
        female: 51
      }
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[[-76.0, 36.8], [-75.9, 36.8], [-75.9, 36.9], [-76.0, 36.9], [-76.0, 36.8]]]
    }
  }]
};
// Map control component to handle view changes
const MapControl = ({
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
// Helper function to calculate centroid of polygon
const calculateCentroid = (coordinates: number[][][]): [number, number] => {
  // For simple polygons, we can just average the points
  // For more complex shapes, a more sophisticated algorithm would be needed
  const points = coordinates[0]; // Use the first (outer) ring
  let sumLat = 0;
  let sumLng = 0;
  points.forEach(point => {
    sumLng += point[0];
    sumLat += point[1];
  });
  return [sumLat / points.length, sumLng / points.length];
};
// Convert GeoJSON features to bubble data
const convertToBubbleData = (geoJson: any) => {
  return geoJson.features.map(feature => {
    const centroid = calculateCentroid(feature.geometry.coordinates);
    return {
      id: feature.properties.PRECINCT_ID,
      name: feature.properties.NAME,
      county: feature.properties.COUNTY,
      avgScore: feature.properties.avgScore,
      totalVoters: feature.properties.totalVoters,
      demographics: feature.properties.demographics,
      center: centroid
    };
  });
};
const StatewideMapCell: React.FC = () => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([37.5, -78.5]); // Center of Virginia
  const [mapZoom, setMapZoom] = useState(7);
  const [geoJsonData, setGeoJsonData] = useState(mockVirginiaGeoJSON);
  const [bubbleData, setBubbleData] = useState(convertToBubbleData(mockVirginiaGeoJSON));
  const [selectedRace, setSelectedRace] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [eligibilityThreshold, setEligibilityThreshold] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // Function to get color based on eligibility score
  const getColor = (score: number) => {
    if (score >= 0.9) return '#10B981'; // Green for high scores
    if (score >= 0.8) return '#10B981'; // Green
    if (score >= 0.7) return '#10B981'; // Green
    if (score >= 0.6) return '#FBBF24'; // Yellow for medium scores
    if (score >= 0.5) return '#FBBF24'; // Yellow
    if (score >= 0.4) return '#FBBF24'; // Yellow
    return '#EF4444'; // Red for low scores
  };
  // Calculate bubble size based on total voters
  const getBubbleRadius = (totalVoters: number) => {
    // Scale the radius based on voter count
    // Min radius is 10, max is 30, with logarithmic scaling to prevent huge bubbles
    const minRadius = 10;
    const maxRadius = 30;
    const minVoters = 500;
    const maxVoters = 2000;
    if (totalVoters <= minVoters) return minRadius;
    if (totalVoters >= maxVoters) return maxRadius;
    // Logarithmic scaling
    const scale = (maxRadius - minRadius) / Math.log(maxVoters / minVoters);
    return minRadius + scale * Math.log(totalVoters / minVoters);
  };
  // Filter data when demographics selections change
  const filterData = () => {
    setIsLoading(true);
    // Simulate API call or data processing delay
    setTimeout(() => {
      // In a real app, this would filter the actual data
      // Here we're just simulating the effect
      const newData = {
        ...mockVirginiaGeoJSON
      };
      // Apply random adjustments to simulate filtering
      newData.features = newData.features.map(feature => {
        const newFeature = {
          ...feature
        };
        if (selectedRace !== 'all' || selectedGender !== 'all') {
          // Adjust score slightly to simulate filtering effect
          const adjustment = Math.random() * 0.2 - 0.1;
          newFeature.properties = {
            ...newFeature.properties,
            avgScore: Math.max(0, Math.min(1, newFeature.properties.avgScore + adjustment))
          };
        }
        return newFeature;
      });
      setGeoJsonData(newData);
      setBubbleData(convertToBubbleData(newData));
      setIsLoading(false);
    }, 1000);
  };
  useEffect(() => {
    filterData();
  }, [selectedRace, selectedGender, eligibilityThreshold]);
  return <div>
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Race/Ethnicity
          </label>
          <select value={selectedRace} onChange={e => setSelectedRace(e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" disabled={isLoading}>
            <option value="all">All Races</option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="hispanic">Hispanic</option>
            <option value="asian">Asian</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select value={selectedGender} onChange={e => setSelectedGender(e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" disabled={isLoading}>
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Eligibility Score: {eligibilityThreshold / 100}
          </label>
          <input type="range" min="0" max="100" value={eligibilityThreshold} onChange={e => setEligibilityThreshold(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" disabled={isLoading} />
        </div>
      </div>
      <div className="relative h-[500px] rounded-lg overflow-hidden border border-gray-200">
        {isLoading && <div className="absolute inset-0 bg-white bg-opacity-70 z-10 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <RefreshCwIcon className="h-5 w-5 text-blue-500 animate-spin" />
              <span className="text-sm font-medium text-gray-700">
                Updating map...
              </span>
            </div>
          </div>}
        <MapContainer center={mapCenter} zoom={mapZoom} style={{
        height: '100%',
        width: '100%'
      }} zoomControl={false}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ZoomControl position="bottomright" />
          <MapControl center={mapCenter} zoom={mapZoom} />
          {bubbleData.map(precinct => <CircleMarker key={precinct.id} center={precinct.center} radius={getBubbleRadius(precinct.totalVoters)} pathOptions={{
          fillColor: getColor(precinct.avgScore),
          color: getColor(precinct.avgScore),
          weight: 1,
          fillOpacity: 0.7,
          opacity: 1
        }}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-medium">{precinct.name}</h3>
                  <p className="text-sm text-gray-600">
                    {precinct.county} County
                  </p>
                  <div className="mt-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Eligibility Score:
                      </span>
                      <span className="text-sm">
                        {(precinct.avgScore * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Total Voters:</span>
                      <span className="text-sm">
                        {precinct.totalVoters.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="text-sm font-medium mb-1">
                      Demographics:
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      <div className="text-xs">
                        White: {precinct.demographics.white}%
                      </div>
                      <div className="text-xs">
                        Black: {precinct.demographics.black}%
                      </div>
                      <div className="text-xs">
                        Hispanic: {precinct.demographics.hispanic}%
                      </div>
                      <div className="text-xs">
                        Asian: {precinct.demographics.asian}%
                      </div>
                      <div className="text-xs">
                        Male: {precinct.demographics.male}%
                      </div>
                      <div className="text-xs">
                        Female: {precinct.demographics.female}%
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>)}
        </MapContainer>
      </div>
      <div className="mt-4 flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-gray-700">
            Eligibility Score:
          </span>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 rounded-sm" style={{
            backgroundColor: '#EF4444'
          }}></div>
            <span className="text-xs">Low</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 rounded-sm" style={{
            backgroundColor: '#FBBF24'
          }}></div>
            <span className="text-xs">Medium</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 rounded-sm" style={{
            backgroundColor: '#10B981'
          }}></div>
            <span className="text-xs">High</span>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Bubble size represents total voter population
        </div>
      </div>
      <div className="mt-4 p-3 border border-blue-100 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800 font-medium">
          About This Bubble Map
        </p>
        <p className="text-xs text-blue-700 mt-1">
          Each bubble represents a precinct. The size of the bubble indicates
          the total number of voters in that precinct, while the color
          represents the average voter eligibility score. Click on a bubble for
          detailed information.
        </p>
      </div>
    </div>;
};
export default StatewideMapCell;