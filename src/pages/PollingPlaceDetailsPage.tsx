import React, { useEffect, useState, Component } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { MapPinIcon, ClockIcon, CalendarIcon, UsersIcon, CheckCircleIcon, XCircleIcon, AlertTriangleIcon, ArrowLeftIcon, FileTextIcon, AccessibilityIcon, CarIcon, InfoIcon, ChartBarIcon, UploadIcon } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DemographicBarChart from '../components/admin/analytics/DemographicBarChart';
import ExportTab from '../components/admin/exports/ExportTab';
import { extendedPollingPlacesData, extendedIncidentData } from '../data/extendedPollingPlacesData';
// Fix for Leaflet marker icon issue in React
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});
// Mock demographics data generator for polling places
const generateMockDemographics = pollingPlaceId => {
  // Use polling place ID to generate consistent random data
  const seed = parseInt(pollingPlaceId) || 1;
  const rand = (min, max) => {
    const x = Math.sin(seed * 9999) * 10000;
    const r = x - Math.floor(x);
    return Math.floor(min + r * (max - min));
  };
  // Generate population totals
  const totalPopulation = rand(1200, 3000);
  const whitePopulation = Math.floor(totalPopulation * (rand(40, 70) / 100));
  const blackPopulation = Math.floor(totalPopulation * (rand(15, 30) / 100));
  const hispanicPopulation = Math.floor(totalPopulation * (rand(8, 20) / 100));
  const asianPopulation = Math.floor(totalPopulation * (rand(5, 15) / 100));
  const otherPopulation = totalPopulation - (whitePopulation + blackPopulation + hispanicPopulation + asianPopulation);
  // Generate scores
  const whiteScore = rand(75, 95) / 100;
  const blackScore = rand(60, 85) / 100;
  const hispanicScore = rand(55, 80) / 100;
  const asianScore = rand(65, 90) / 100;
  const otherScore = rand(60, 85) / 100;
  // Calculate at-risk voters
  const whiteAtRisk = Math.floor(whitePopulation * (1 - whiteScore) * 0.8);
  const blackAtRisk = Math.floor(blackPopulation * (1 - blackScore) * 0.8);
  const hispanicAtRisk = Math.floor(hispanicPopulation * (1 - hispanicScore) * 0.8);
  const asianAtRisk = Math.floor(asianPopulation * (1 - asianScore) * 0.8);
  const otherAtRisk = Math.floor(otherPopulation * (1 - otherScore) * 0.8);
  // Calculate overall score (weighted average)
  const totalAtRisk = whiteAtRisk + blackAtRisk + hispanicAtRisk + asianAtRisk + otherAtRisk;
  const avgScore = (whitePopulation * whiteScore + blackPopulation * blackScore + hispanicPopulation * hispanicScore + asianPopulation * asianScore + otherPopulation * otherScore) / totalPopulation;
  return {
    affectedPopulation: totalPopulation,
    atRiskVoters: totalAtRisk,
    avgScore: avgScore,
    demographics: {
      white: {
        population: whitePopulation,
        avgScore: whiteScore,
        atRiskVoters: whiteAtRisk
      },
      black: {
        population: blackPopulation,
        avgScore: blackScore,
        atRiskVoters: blackAtRisk
      },
      hispanic: {
        population: hispanicPopulation,
        avgScore: hispanicScore,
        atRiskVoters: hispanicAtRisk
      },
      asian: {
        population: asianPopulation,
        avgScore: asianScore,
        atRiskVoters: asianAtRisk
      },
      other: {
        population: otherPopulation,
        avgScore: otherScore,
        atRiskVoters: otherAtRisk
      },
      male: {
        population: Math.floor(totalPopulation * 0.48),
        avgScore: rand(70, 90) / 100,
        atRiskVoters: Math.floor(totalPopulation * 0.48 * 0.2)
      },
      female: {
        population: Math.floor(totalPopulation * 0.52),
        avgScore: rand(72, 92) / 100,
        atRiskVoters: Math.floor(totalPopulation * 0.52 * 0.18)
      }
    }
  };
};
const PollingPlaceDetailsPage: React.FC = () => {
  const {
    pollingPlaceId
  } = useParams<{
    pollingPlaceId: string;
  }>();
  const [pollingPlace, setPollingPlace] = useState<any>(null);
  const [incidentData, setIncidentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'details' | 'precincts' | 'incidents' | 'demographics' | 'export'>('details');
  const [darkMode, setDarkMode] = useState(false);
  const [demographicData, setDemographicData] = useState<any>(null);
  // Check if dark mode is enabled
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setDarkMode(isDarkMode);
  }, []);
  useEffect(() => {
    // Find the polling place by ID
    const foundPollingPlace = extendedPollingPlacesData.find(place => place.id === pollingPlaceId);
    setPollingPlace(foundPollingPlace || null);
    // Find any incident data for this polling place
    const foundIncidentData = extendedIncidentData.find(incident => incident.name === foundPollingPlace?.name);
    setIncidentData(foundIncidentData || null);
    // Generate demographic data
    if (pollingPlaceId) {
      setDemographicData(generateMockDemographics(pollingPlaceId));
    }
    setLoading(false);
  }, [pollingPlaceId]);
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#235280] mx-auto"></div>
            <p className="mt-4 text-gray-600">
              Loading polling place details...
            </p>
          </div>
        </main>
        <Footer />
      </div>;
  }
  if (!pollingPlace) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <AlertTriangleIcon className="h-12 w-12 text-yellow-500 mx-auto" />
            <h1 className="text-2xl font-bold text-gray-900 mt-4">
              Polling Place Not Found
            </h1>
            <p className="mt-2 text-gray-600">
              We couldn't find a polling place with the ID: {pollingPlaceId}
            </p>
            <div className="mt-6">
              <Link to="/admin/map" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#235280] hover:bg-[#1e456e]">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Polling Places
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>;
  }
  // Calculate the status based on incidents
  const status = incidentData?.incidents > 3 ? 'issue' : 'ok';
  // Get recently changed precincts
  const recentlyChangedPrecincts = pollingPlace.precincts.filter(precinct => precinct.recentlyChanged);
  // Check if accessibility information is available
  const hasAccessibilityInfo = pollingPlace.accessibility || false;
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-4 sm:px-0">
            {/* Breadcrumbs */}
            <nav className="mb-4">
              <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                  <Link to="/" className="hover:text-gray-700">
                    Home
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-1">/</span>
                  <Link to="/admin/map" className="hover:text-gray-700">
                    Polling Places
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-1">/</span>
                  <span className="text-gray-900 font-medium">
                    {pollingPlace.name}
                  </span>
                </li>
              </ol>
            </nav>
            {/* Polling Place Header */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {pollingPlace.name}
                  </h1>
                  <p className="text-lg text-gray-600 mt-1">
                    {pollingPlace.address}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-500 mr-4">
                      {pollingPlace.county} County, {pollingPlace.zipCode}
                    </span>
                    {status === 'ok' ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircleIcon className="h-3 w-3 mr-1" />
                        Operating Normally
                      </span> : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <AlertTriangleIcon className="h-3 w-3 mr-1" />
                        Issues Reported
                      </span>}
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="flex space-x-2">
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pollingPlace.name} ${pollingPlace.address}`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      Get Directions
                    </a>
                    <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#235280] hover:bg-[#1e456e]">
                      <FileTextIcon className="h-4 w-4 mr-2" />
                      Download Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Tabs */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px overflow-x-auto">
                  <button onClick={() => setActiveTab('details')} className={`py-4 px-6 text-sm font-medium ${activeTab === 'details' ? 'border-b-2 border-[#235280] text-[#235280]' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                    <InfoIcon className="h-4 w-4 inline mr-2" />
                    Details
                  </button>
                  <button onClick={() => setActiveTab('demographics')} className={`py-4 px-6 text-sm font-medium ${activeTab === 'demographics' ? 'border-b-2 border-[#235280] text-[#235280]' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                    <ChartBarIcon className="h-4 w-4 inline mr-2" />
                    Demographics
                  </button>
                  <button onClick={() => setActiveTab('precincts')} className={`py-4 px-6 text-sm font-medium ${activeTab === 'precincts' ? 'border-b-2 border-[#235280] text-[#235280]' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                    <UsersIcon className="h-4 w-4 inline mr-2" />
                    Precincts
                    {recentlyChangedPrecincts.length > 0 && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {recentlyChangedPrecincts.length}
                      </span>}
                  </button>
                  <button onClick={() => setActiveTab('incidents')} className={`py-4 px-6 text-sm font-medium ${activeTab === 'incidents' ? 'border-b-2 border-[#235280] text-[#235280]' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                    <AlertTriangleIcon className="h-4 w-4 inline mr-2" />
                    Incidents
                    {incidentData && incidentData.incidents > 0 && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {incidentData.incidents}
                      </span>}
                  </button>
                  <button onClick={() => setActiveTab('export')} className={`py-4 px-6 text-sm font-medium ${activeTab === 'export' ? 'border-b-2 border-[#235280] text-[#235280]' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                    <UploadIcon className="h-4 w-4 inline mr-2" />
                    Export
                  </button>
                </nav>
              </div>
              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'details' && <div className="space-y-6">
                    {/* Map */}
                    <div className="h-[300px] rounded-lg overflow-hidden border border-gray-200">
                      <MapContainer center={[pollingPlace.lat, pollingPlace.lng]} zoom={15} style={{
                    height: '100%',
                    width: '100%'
                  }} zoomControl={false}>
                        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <ZoomControl position="bottomright" />
                        <Marker position={[pollingPlace.lat, pollingPlace.lng]}>
                          <Popup>
                            <div className="text-center">
                              <strong>{pollingPlace.name}</strong>
                              <div className="text-xs">
                                {pollingPlace.address}
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Hours and Dates */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                          <ClockIcon className="h-5 w-5 mr-2 text-[#235280]" />
                          Hours of Operation
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Election Day:
                            </span>
                            <span className="text-sm font-medium">
                              7:00 AM - 8:00 PM
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Early Voting:
                            </span>
                            <span className="text-sm font-medium">
                              9:00 AM - 5:00 PM
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1 text-[#235280]" />
                            Important Dates
                          </h4>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-500">
                                Early Voting Begins:
                              </span>
                              <span className="text-xs">Oct 15, 2024</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-500">
                                Election Day:
                              </span>
                              <span className="text-xs">Nov 5, 2024</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Accessibility Information */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                          <AccessibilityIcon className="h-5 w-5 mr-2 text-[#235280]" />
                          Accessibility
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">
                              Wheelchair accessible entrance
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">
                              ADA-compliant voting booths
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">
                              Accessible restrooms
                            </span>
                          </li>
                          <li className="flex items-start">
                            {hasAccessibilityInfo ? <>
                                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">
                                  Ballot marking devices for voters with
                                  disabilities
                                </span>
                              </> : <>
                                <XCircleIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">
                                  No ballot marking devices available
                                </span>
                              </>}
                          </li>
                        </ul>
                      </div>
                      {/* Parking & Transportation */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                          <CarIcon className="h-5 w-5 mr-2 text-[#235280]" />
                          Parking & Transportation
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">
                              Free parking available
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">
                              Handicap parking spaces
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">
                              Drop-off area near entrance
                            </span>
                          </li>
                          <li className="flex items-start">
                            <InfoIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">
                              Bus routes: 42, 51, 67
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* Current Status */}
                    <div className={`p-4 rounded-lg ${status === 'ok' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                      <h3 className={`text-lg font-medium mb-2 flex items-center ${status === 'ok' ? 'text-green-800' : 'text-red-800'}`}>
                        {status === 'ok' ? <CheckCircleIcon className="h-5 w-5 mr-2" /> : <AlertTriangleIcon className="h-5 w-5 mr-2" />}
                        Current Status:{' '}
                        {status === 'ok' ? 'Operating Normally' : 'Issues Reported'}
                      </h3>
                      <p className={`text-sm ${status === 'ok' ? 'text-green-700' : 'text-red-700'}`}>
                        {status === 'ok' ? 'This polling location is currently operating normally with no reported issues.' : `There are currently ${incidentData?.incidents || 0} reported incidents at this location. See the Incidents tab for details.`}
                      </p>
                      {status !== 'ok' && <div className="mt-3">
                          <button className="text-sm font-medium text-red-700 hover:text-red-800" onClick={() => setActiveTab('incidents')}>
                            View Incident Details →
                          </button>
                        </div>}
                    </div>
                  </div>}
                {activeTab === 'demographics' && demographicData && <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Demographic Analysis
                    </h2>
                    <p className="text-gray-600 mb-6">
                      This polling location serves approximately{' '}
                      {demographicData.affectedPopulation.toLocaleString()}{' '}
                      registered voters across multiple precincts. Below is a
                      breakdown of the demographic composition and voter
                      eligibility statistics.
                    </p>
                    {/* Demographic Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Voter Overview
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">
                              Total Registered Voters
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {demographicData.affectedPopulation.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              At-Risk Voters
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {demographicData.atRiskVoters.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Eligibility Score
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {(demographicData.avgScore * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Racial Demographics
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">White</span>
                            <span className="text-sm font-medium">
                              {Math.round(demographicData.demographics.white.population / demographicData.affectedPopulation * 100)}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{
                          width: `${Math.round(demographicData.demographics.white.population / demographicData.affectedPopulation * 100)}%`
                        }}></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Black</span>
                            <span className="text-sm font-medium">
                              {Math.round(demographicData.demographics.black.population / demographicData.affectedPopulation * 100)}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{
                          width: `${Math.round(demographicData.demographics.black.population / demographicData.affectedPopulation * 100)}%`
                        }}></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              Hispanic
                            </span>
                            <span className="text-sm font-medium">
                              {Math.round(demographicData.demographics.hispanic.population / demographicData.affectedPopulation * 100)}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{
                          width: `${Math.round(demographicData.demographics.hispanic.population / demographicData.affectedPopulation * 100)}%`
                        }}></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Asian</span>
                            <span className="text-sm font-medium">
                              {Math.round(demographicData.demographics.asian.population / demographicData.affectedPopulation * 100)}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{
                          width: `${Math.round(demographicData.demographics.asian.population / demographicData.affectedPopulation * 100)}%`
                        }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Eligibility by Demographic
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">White</span>
                            <span className="text-sm font-medium">
                              {(demographicData.demographics.white.avgScore * 100).toFixed(1)}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className={`h-2 rounded-full ${demographicData.demographics.white.avgScore > 0.8 ? 'bg-green-500' : demographicData.demographics.white.avgScore > 0.6 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                          width: `${demographicData.demographics.white.avgScore * 100}%`
                        }}></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Black</span>
                            <span className="text-sm font-medium">
                              {(demographicData.demographics.black.avgScore * 100).toFixed(1)}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className={`h-2 rounded-full ${demographicData.demographics.black.avgScore > 0.8 ? 'bg-green-500' : demographicData.demographics.black.avgScore > 0.6 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                          width: `${demographicData.demographics.black.avgScore * 100}%`
                        }}></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              Hispanic
                            </span>
                            <span className="text-sm font-medium">
                              {(demographicData.demographics.hispanic.avgScore * 100).toFixed(1)}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className={`h-2 rounded-full ${demographicData.demographics.hispanic.avgScore > 0.8 ? 'bg-green-500' : demographicData.demographics.hispanic.avgScore > 0.6 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                          width: `${demographicData.demographics.hispanic.avgScore * 100}%`
                        }}></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Asian</span>
                            <span className="text-sm font-medium">
                              {(demographicData.demographics.asian.avgScore * 100).toFixed(1)}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className={`h-2 rounded-full ${demographicData.demographics.asian.avgScore > 0.8 ? 'bg-green-500' : demographicData.demographics.asian.avgScore > 0.6 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                          width: `${demographicData.demographics.asian.avgScore * 100}%`
                        }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Demographic Bar Chart */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Demographic Distribution
                      </h3>
                      <div className="bg-white p-4 border border-gray-200 rounded-lg">
                        <DemographicBarChart precinct={demographicData} darkMode={darkMode} />
                      </div>
                    </div>
                    {/* At-Risk Voter Analysis */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        At-Risk Voter Analysis
                      </h3>
                      <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Demographic Group
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Population
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                At-Risk Voters
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                At-Risk %
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Eligibility Score
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                White
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {demographicData.demographics.white.population.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {demographicData.demographics.white.atRiskVoters.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {(demographicData.demographics.white.atRiskVoters / demographicData.demographics.white.population * 100).toFixed(1)}
                                %
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${demographicData.demographics.white.avgScore >= 0.8 ? 'bg-green-100 text-green-800' : demographicData.demographics.white.avgScore >= 0.6 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                  {(demographicData.demographics.white.avgScore * 100).toFixed(1)}
                                  %
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Black
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {demographicData.demographics.black.population.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {demographicData.demographics.black.atRiskVoters.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {(demographicData.demographics.black.atRiskVoters / demographicData.demographics.black.population * 100).toFixed(1)}
                                %
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${demographicData.demographics.black.avgScore >= 0.8 ? 'bg-green-100 text-green-800' : demographicData.demographics.black.avgScore >= 0.6 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                  {(demographicData.demographics.black.avgScore * 100).toFixed(1)}
                                  %
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Hispanic
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {demographicData.demographics.hispanic.population.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {demographicData.demographics.hispanic.atRiskVoters.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {(demographicData.demographics.hispanic.atRiskVoters / demographicData.demographics.hispanic.population * 100).toFixed(1)}
                                %
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${demographicData.demographics.hispanic.avgScore >= 0.8 ? 'bg-green-100 text-green-800' : demographicData.demographics.hispanic.avgScore >= 0.6 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                  {(demographicData.demographics.hispanic.avgScore * 100).toFixed(1)}
                                  %
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Asian
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {demographicData.demographics.asian.population.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {demographicData.demographics.asian.atRiskVoters.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {(demographicData.demographics.asian.atRiskVoters / demographicData.demographics.asian.population * 100).toFixed(1)}
                                %
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${demographicData.demographics.asian.avgScore >= 0.8 ? 'bg-green-100 text-green-800' : demographicData.demographics.asian.avgScore >= 0.6 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                  {(demographicData.demographics.asian.avgScore * 100).toFixed(1)}
                                  %
                                </span>
                              </td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Total
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {demographicData.affectedPopulation.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {demographicData.atRiskVoters.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {(demographicData.atRiskVoters / demographicData.affectedPopulation * 100).toFixed(1)}
                                %
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${demographicData.avgScore >= 0.8 ? 'bg-green-100 text-green-800' : demographicData.avgScore >= 0.6 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                  {(demographicData.avgScore * 100).toFixed(1)}%
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* Recommendations */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-medium text-blue-800 mb-3">
                        Recommendations
                      </h3>
                      <ul className="space-y-2 text-sm text-blue-700">
                        <li className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 relative flex items-center justify-center">
                            <div className="absolute h-4 w-4 rounded-full bg-blue-200"></div>
                            <div className="absolute h-2 w-2 rounded-full bg-blue-500"></div>
                          </div>
                          <p className="ml-2">
                            {demographicData.demographics.black.avgScore < 0.7 ? 'Consider targeted outreach to African American voters in this area to increase voter eligibility awareness.' : 'Continue supporting African American voter participation through community engagement.'}
                          </p>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 relative flex items-center justify-center">
                            <div className="absolute h-4 w-4 rounded-full bg-blue-200"></div>
                            <div className="absolute h-2 w-2 rounded-full bg-blue-500"></div>
                          </div>
                          <p className="ml-2">
                            {demographicData.demographics.hispanic.avgScore < 0.7 ? 'Provide bilingual voting materials and assistance for Hispanic voters.' : 'Maintain bilingual resources to support Hispanic voter participation.'}
                          </p>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 relative flex items-center justify-center">
                            <div className="absolute h-4 w-4 rounded-full bg-blue-200"></div>
                            <div className="absolute h-2 w-2 rounded-full bg-blue-500"></div>
                          </div>
                          <p className="ml-2">
                            Host voter education events at this polling location
                            before election day to address common eligibility
                            issues.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>}
                {activeTab === 'precincts' && <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Assigned Precincts
                    </h2>
                    <p className="text-gray-600 mb-6">
                      This polling location serves the following precincts.
                      Recently changed precinct assignments are highlighted.
                    </p>
                    <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Precinct ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Precinct Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Voters
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {pollingPlace.precincts.map(precinct => <tr key={precinct.id} className={precinct.recentlyChanged ? 'bg-red-50' : ''}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {precinct.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {precinct.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {precinct.recentlyChanged ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    Recently Changed
                                  </span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Active
                                  </span>}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {/* Mock voter count - in a real app this would come from the data */}
                                {Math.floor(Math.random() * 2000) + 500}
                              </td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>
                    {/* Removed Precincts Section */}
                    {pollingPlace.hasRemovedPrecinct && pollingPlace.removedPrecincts && pollingPlace.removedPrecincts.length > 0 && <div className="mt-8">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Recently Removed Precincts
                          </h3>
                          <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
                            <p className="text-sm text-red-700">
                              <AlertTriangleIcon className="h-4 w-4 inline mr-1" />
                              The following precincts were recently removed from
                              this polling location. Voters in these precincts
                              have been reassigned to different polling
                              locations.
                            </p>
                          </div>
                          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Precinct ID
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Precinct Name
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {pollingPlace.removedPrecincts.map(precinct => <tr key={precinct.id} className="bg-red-50">
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {precinct.id}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {precinct.name}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                          Removed
                                        </span>
                                      </td>
                                    </tr>)}
                              </tbody>
                            </table>
                          </div>
                        </div>}
                  </div>}
                {activeTab === 'incidents' && <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Incident Reports
                    </h2>
                    {!incidentData || incidentData.incidents === 0 ? <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
                        <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto" />
                        <h3 className="text-lg font-medium text-green-800 mt-3">
                          No Incidents Reported
                        </h3>
                        <p className="text-green-700 mt-2">
                          There are currently no reported incidents at this
                          polling location.
                        </p>
                      </div> : <>
                        <p className="text-gray-600 mb-6">
                          There {incidentData.incidents === 1 ? 'is' : 'are'}{' '}
                          currently {incidentData.incidents} reported{' '}
                          {incidentData.incidents === 1 ? 'incident' : 'incidents'}{' '}
                          at this polling location.
                        </p>
                        {/* Incident Summary */}
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
                          <h3 className="text-lg font-medium text-red-800 mb-2">
                            Incident Summary
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-3 rounded border border-red-100">
                              <div className="text-2xl font-bold text-red-600">
                                {incidentData.incidents}
                              </div>
                              <div className="text-sm text-gray-500">
                                Total Incidents
                              </div>
                            </div>
                            <div className="bg-white p-3 rounded border border-red-100">
                              <div className="text-2xl font-bold text-yellow-600">
                                {Math.floor(new Date().getTime() / 1000) % 60}{' '}
                                min
                              </div>
                              <div className="text-sm text-gray-500">
                                Avg. Response Time
                              </div>
                            </div>
                            <div className="bg-white p-3 rounded border border-red-100">
                              <div className="text-2xl font-bold text-blue-600">
                                {Math.floor(incidentData.incidents * 0.7)}
                              </div>
                              <div className="text-sm text-gray-500">
                                Resolved
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Incident Types */}
                        {incidentData.incidentTypes && incidentData.incidentTypes.length > 0 && <div className="mb-6">
                              <h3 className="text-lg font-medium text-gray-900 mb-3">
                                Incident Types
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {incidentData.incidentTypes.map((type, index) => <span key={index} className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                                      {type}
                                    </span>)}
                              </div>
                            </div>}
                        {/* Mock Incidents Table */}
                        <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Type
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Reported
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {/* Generate mock incidents based on the incident count and types */}
                              {Array.from({
                          length: incidentData.incidents
                        }).map((_, index) => {
                          const mockIncidentType = incidentData.incidentTypes[index % incidentData.incidentTypes.length];
                          const mockStatus = index % 3 === 0 ? 'Open' : index % 3 === 1 ? 'In Progress' : 'Resolved';
                          const mockDate = new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24);
                          return <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      INC-{String(index + 1).padStart(3, '0')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {mockIncidentType}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {mockDate.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${mockStatus === 'Open' ? 'bg-red-100 text-red-800' : mockStatus === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                        {mockStatus}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                      {mockIncidentType === 'Long Line' ? 'Voters reporting wait times of 1-2 hours' : mockIncidentType === 'Equipment Issues' ? 'Two voting machines are not functioning properly' : mockIncidentType === 'Not Accessible' ? 'Wheelchair ramp is temporarily blocked' : 'Voters reporting issues with the voting process'}
                                    </td>
                                  </tr>;
                        })}
                            </tbody>
                          </table>
                        </div>
                        {/* Report New Incident Button */}
                        <div className="mt-6 flex justify-end">
                          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700">
                            <AlertTriangleIcon className="h-4 w-4 mr-2" />
                            Report New Incident
                          </button>
                        </div>
                      </>}
                  </div>}
                {activeTab === 'export' && <ExportTab pollingPlace={pollingPlace} precinctData={demographicData} />}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default PollingPlaceDetailsPage;