import React, { useState } from 'react';
import { MapIcon, BarChartIcon, FileTextIcon, FilterIcon, DownloadIcon, CodeIcon, RefreshCwIcon, BookOpenIcon, ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import NotebookCell from './NotebookCell';
import StatewideMapCell from './cells/StatewideMapCell';
import DemographicsCell from './cells/DemographicsCell';
import SummaryStatsCell from './cells/SummaryStatsCell';
import HistogramCell from './cells/HistogramCell';
import CodeCell from './cells/CodeCell';
import MarkdownCell from './cells/MarkdownCell';
const NotebookLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('statewide');
  const sections = [{
    id: 'statewide',
    label: 'Statewide View',
    icon: MapIcon
  }, {
    id: 'demographics',
    label: 'Demographics',
    icon: BarChartIcon
  }, {
    id: 'precincts',
    label: 'Precinct Analysis',
    icon: FileTextIcon
  }, {
    id: 'filters',
    label: 'Advanced Filters',
    icon: FilterIcon
  }, {
    id: 'export',
    label: 'Export Data',
    icon: DownloadIcon
  }];
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  return <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="flex h-[calc(100vh-200px)] min-h-[600px]">
        {/* Sidebar */}
        <div className={`bg-gray-50 border-r border-gray-200 flex flex-col ${sidebarCollapsed ? 'w-14' : 'w-64'} transition-all duration-300`}>
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {!sidebarCollapsed && <h3 className="font-medium text-gray-900">Notebook Navigator</h3>}
            <button onClick={toggleSidebar} className="p-1 rounded-md text-gray-500 hover:bg-gray-200">
              {sidebarCollapsed ? <ChevronRightIcon size={18} /> : <ChevronLeftIcon size={18} />}
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-2">
            {sections.map(section => {
            const Icon = section.icon;
            return <button key={section.id} onClick={() => setActiveSection(section.id)} className={`w-full flex items-center px-3 py-2 my-1 rounded-md text-sm font-medium ${activeSection === section.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-200'}`}>
                  <Icon className="h-5 w-5 mr-2" />
                  {!sidebarCollapsed && <span>{section.label}</span>}
                </button>;
          })}
          </nav>
          <div className="p-4 border-t border-gray-200">
            {!sidebarCollapsed && <div className="text-xs text-gray-500">
                Last updated: Today, 10:15 AM
              </div>}
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeSection === 'statewide' && <>
              <NotebookCell title="Statewide Voter Eligibility Analysis" type="markdown">
                <MarkdownCell content={`
# Voter Eligibility Score Heatmap
This notebook visualizes voter eligibility scores across Virginia precincts. The data is based on our voter eligibility model that combines various factors to produce a score between 0.0 (potentially ineligible) and 1.0 (confirmed eligible).
## Data Sources
- Individual voter records (anonymized)
- Virginia precinct boundary shapefiles
- Census demographic data
## Methodology
The heatmap shows the average eligibility score within each precinct. You can filter by demographic factors and adjust the eligibility score threshold using the controls below the map.
                  `} />
              </NotebookCell>
              <NotebookCell title="Data Loading and Processing" type="code" collapsible={true} initiallyCollapsed={true}>
                <CodeCell code={`
// Load voter data CSV
const voters = await d3.csv("data/virginia_voters.csv");
// Load Virginia precinct GeoJSON
const precincts = await d3.json("data/virginia_precincts.geojson");
// Join voter data to precincts using spatial join
const votersByPrecinct = voters.reduce((acc, voter) => {
  const precinctId = findPrecinctForPoint(
    [voter.longitude, voter.latitude], 
    precincts
  );
  if (!acc[precinctId]) {
    acc[precinctId] = [];
  }
  acc[precinctId].push(voter);
  return acc;
}, {});
// Calculate average eligibility score by precinct
const precinctScores = Object.entries(votersByPrecinct).map(
  ([precinctId, voters]) => {
    const avgScore = voters.reduce(
      (sum, voter) => sum + parseFloat(voter.voter_eligibility_score), 
      0
    ) / voters.length;
    return {
      precinctId,
      avgScore,
      totalVoters: voters.length,
      demographics: calculateDemographics(voters)
    };
  }
);
// Join scores back to GeoJSON for mapping
precincts.features.forEach(feature => {
  const precinctData = precinctScores.find(
    p => p.precinctId === feature.properties.PRECINCT_ID
  );
  feature.properties.avgScore = precinctData?.avgScore || 0;
  feature.properties.totalVoters = precinctData?.totalVoters || 0;
  feature.properties.demographics = precinctData?.demographics || {};
});
                  `} />
              </NotebookCell>
              <NotebookCell title="Statewide Voter Eligibility Heatmap" type="visualization">
                <StatewideMapCell />
              </NotebookCell>
              <NotebookCell title="Summary Statistics" type="visualization">
                <SummaryStatsCell />
              </NotebookCell>
              <NotebookCell title="Eligibility Score Distribution" type="visualization">
                <HistogramCell />
              </NotebookCell>
            </>}
          {activeSection === 'demographics' && <>
              <NotebookCell title="Demographic Analysis" type="markdown">
                <MarkdownCell content={`
# Demographic Analysis of Voter Eligibility
This section breaks down voter eligibility scores by demographic factors including race, gender, and age groups. The visualizations help identify potential disparities in voter eligibility across different demographic segments.
## Key Questions
- Are there significant disparities in eligibility scores between demographic groups?
- Which demographic segments might need targeted voter education or registration assistance?
- How do demographic patterns of eligibility vary geographically across the state?
                  `} />
              </NotebookCell>
              <NotebookCell title="Demographic Breakdown" type="visualization">
                <DemographicsCell />
              </NotebookCell>
            </>}
          {activeSection === 'precincts' && <div className="flex items-center justify-center h-full">
              <div className="text-center p-12">
                <BookOpenIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Precinct-Level Analysis
                </h3>
                <p className="text-gray-500 mb-4">
                  This section will provide detailed analysis of individual
                  precincts, including demographic composition and eligibility
                  score distribution.
                </p>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Coming Soon
                </button>
              </div>
            </div>}
          {(activeSection === 'filters' || activeSection === 'export') && <div className="flex items-center justify-center h-full">
              <div className="text-center p-12">
                <CodeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {activeSection === 'filters' ? 'Advanced Filters' : 'Export Data'}
                </h3>
                <p className="text-gray-500 mb-4">
                  This section is currently under development.
                </p>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Coming Soon
                </button>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export default NotebookLayout;