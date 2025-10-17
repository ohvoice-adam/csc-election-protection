import React, { useEffect, useRef, createElement, Component } from 'react';
import * as d3 from 'd3';
import { DownloadIcon, BarChart2Icon, TableIcon, InfoIcon } from 'lucide-react';
interface AnalyticsCellsProps {
  region: string;
  precincts: any;
  voters: any[];
  analysis: any;
  darkMode: boolean;
}
const AnalyticsCells: React.FC<AnalyticsCellsProps> = ({
  region,
  precincts,
  voters,
  analysis,
  darkMode
}) => {
  const histogramRef = useRef<HTMLDivElement>(null);
  // Generate histogram data from voter eligibility scores
  useEffect(() => {
    if (histogramRef.current && voters.length > 0) {
      createHistogram(voters.map(v => v.voter_eligibility_score), histogramRef.current, darkMode);
    }
  }, [voters, darkMode]);
  // Create histogram visualization
  const createHistogram = (data: number[], container: HTMLElement, darkMode: boolean) => {
    // Clear existing chart
    d3.select(container).selectAll('*').remove();
    // Set up dimensions
    const margin = {
      top: 30,
      right: 30,
      bottom: 40,
      left: 50
    };
    const width = container.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    // Create SVG
    const svg = d3.select(container).append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    // X scale
    const x = d3.scaleLinear().domain([0, 1]).range([0, width]);
    // Create histogram function
    const histogram = d3.histogram().value(d => d).domain(x.domain()).thresholds(x.ticks(20));
    // Apply histogram function to data
    const bins = histogram(data);
    // Y scale
    const y = d3.scaleLinear().domain([0, d3.max(bins, d => d.length) || 0]).range([height, 0]);
    // Add X axis
    svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x).tickFormat(d => `${d * 100}%`)).selectAll('text').style('text-anchor', 'middle').style('fill', darkMode ? '#D1D5DB' : '#4B5563').style('font-size', '11px');
    // Add X axis label
    svg.append('text').attr('text-anchor', 'middle').attr('x', width / 2).attr('y', height + margin.bottom - 5).style('font-size', '12px').style('fill', darkMode ? '#D1D5DB' : '#4B5563').text('Voter Eligibility Score');
    // Add Y axis
    svg.append('g').call(d3.axisLeft(y).ticks(5).tickFormat(d => d.toString())).selectAll('text').style('fill', darkMode ? '#D1D5DB' : '#4B5563').style('font-size', '11px');
    // Add Y axis label
    svg.append('text').attr('text-anchor', 'middle').attr('transform', 'rotate(-90)').attr('y', -margin.left + 15).attr('x', -height / 2).style('font-size', '12px').style('fill', darkMode ? '#D1D5DB' : '#4B5563').text('Number of Voters');
    // Add background grid lines
    svg.append('g').attr('class', 'grid').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x).tickSize(-height).tickFormat(() => '')).selectAll('line').style('stroke', darkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.7)');
    svg.append('g').attr('class', 'grid').call(d3.axisLeft(y).tickSize(-width).tickFormat(() => '')).selectAll('line').style('stroke', darkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.7)');
    // Add bars with gradient fill
    svg.selectAll('rect').data(bins).enter().append('rect').attr('x', d => x(d.x0 || 0)).attr('width', d => Math.max(0, x(d.x1 || 0) - x(d.x0 || 0) - 1)).attr('y', d => y(d.length)).attr('height', d => height - y(d.length)).style('fill', d => {
      const midpoint = (d.x0 || 0) + ((d.x1 || 0) - (d.x0 || 0)) / 2;
      if (midpoint >= 0.8) return '#10B981'; // Green for high scores
      if (midpoint >= 0.6) return '#FBBF24'; // Yellow for medium scores
      if (midpoint >= 0.4) return '#F59E0B'; // Orange for low-medium scores
      return '#EF4444'; // Red for low scores
    }).style('opacity', 0.8).on('mouseover', function (event, d) {
      d3.select(this).style('opacity', 1);
      // Add tooltip
      const tooltip = svg.append('g').attr('class', 'tooltip').attr('transform', `translate(${x((d.x0 || 0) + ((d.x1 || 0) - (d.x0 || 0)) / 2)}, ${y(d.length) - 15})`);
      tooltip.append('text').attr('text-anchor', 'middle').style('fill', darkMode ? '#fff' : '#000').style('font-size', '12px').text(`${d.length} voters`);
    }).on('mouseout', function () {
      d3.select(this).style('opacity', 0.8);
      svg.selectAll('.tooltip').remove();
    });
    // Add mean line
    const meanValue = d3.mean(data) || 0;
    svg.append('line').attr('x1', x(meanValue)).attr('x2', x(meanValue)).attr('y1', 0).attr('y2', height).style('stroke', '#3B82F6').style('stroke-width', 2).style('stroke-dasharray', '5,5');
    // Add mean label with background
    const meanLabel = svg.append('g').attr('transform', `translate(${x(meanValue)}, 10)`);
    meanLabel.append('rect').attr('x', -35).attr('y', -15).attr('width', 70).attr('height', 20).attr('rx', 5).attr('fill', darkMode ? '#1F2937' : '#EFF6FF').attr('stroke', '#3B82F6').attr('stroke-width', 1);
    meanLabel.append('text').attr('text-anchor', 'middle').attr('y', 0).style('font-size', '11px').style('font-weight', 'bold').style('fill', '#3B82F6').text(`Mean: ${(meanValue * 100).toFixed(1)}%`);
  };
  // Get region name for display
  const getRegionName = (regionId: string) => {
    switch (regionId) {
      case 'statewide':
        return 'Statewide';
      case 'north':
        return 'Northern Virginia';
      case 'west':
        return 'Western Virginia';
      case 'east':
        return 'Eastern Virginia';
      case 'south':
        return 'Southern Virginia';
      default:
        return 'Virginia';
    }
  };
  // Calculate at-risk summary for current view
  const atRiskSummary = {
    total: voters.length,
    atRisk: voters.filter(v => v.voter_eligibility_score < 0.5).length,
    atRiskPct: voters.filter(v => v.voter_eligibility_score < 0.5).length / voters.length * 100
  };
  // Export current data as CSV
  const exportCSV = () => {
    // In a real app, this would generate a CSV from the filtered data
    const csvContent = 'data:text/csv;charset=utf-8,' + 'voter_id,gender,race,lon,lat,municipality,voter_eligibility_score\n' + voters.map(v => `${v.voter_id},${v.gender},${v.race},${v.lon},${v.lat},${v.municipality},${v.voter_eligibility_score}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `virginia_voter_data_${region}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // Export GeoJSON data
  const exportGeoJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(precincts));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `virginia_precincts_${region}.geojson`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
  return <div className="space-y-6">
      {/* Score Distribution Histogram */}
      <div className={`border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} rounded-lg shadow-md overflow-hidden`}>
        <div className={`px-4 py-3 ${darkMode ? 'bg-gray-900 border-b border-gray-700' : 'bg-gray-50 border-b border-gray-200'}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <BarChart2Icon className={`h-4 w-4 mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Voter Eligibility Score Distribution
              </h3>
            </div>
            <div className="flex space-x-2">
              <button onClick={exportCSV} className={`p-1.5 rounded-md ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`} title="Export Data as CSV">
                <DownloadIcon size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div ref={histogramRef} className="w-full h-[300px]"></div>
          <div className={`mt-4 grid grid-cols-3 gap-4 text-center text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <div className={`p-2 rounded ${darkMode ? 'bg-red-900 bg-opacity-20' : 'bg-red-50'}`}>
              <div className="font-medium mb-1">Low Scores (0-50%)</div>
              <div className="text-red-500 font-semibold text-base">
                {(voters.filter(v => v.voter_eligibility_score < 0.5).length / voters.length * 100).toFixed(1)}
                %
              </div>
              <div className="text-xs mt-1">
                {voters.filter(v => v.voter_eligibility_score < 0.5).length.toLocaleString()}{' '}
                voters
              </div>
            </div>
            <div className={`p-2 rounded ${darkMode ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-50'}`}>
              <div className="font-medium mb-1">Medium Scores (50-80%)</div>
              <div className="text-yellow-500 font-semibold text-base">
                {(voters.filter(v => v.voter_eligibility_score >= 0.5 && v.voter_eligibility_score < 0.8).length / voters.length * 100).toFixed(1)}
                %
              </div>
              <div className="text-xs mt-1">
                {voters.filter(v => v.voter_eligibility_score >= 0.5 && v.voter_eligibility_score < 0.8).length.toLocaleString()}{' '}
                voters
              </div>
            </div>
            <div className={`p-2 rounded ${darkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-50'}`}>
              <div className="font-medium mb-1">High Scores (80-100%)</div>
              <div className="text-green-500 font-semibold text-base">
                {(voters.filter(v => v.voter_eligibility_score >= 0.8).length / voters.length * 100).toFixed(1)}
                %
              </div>
              <div className="text-xs mt-1">
                {voters.filter(v => v.voter_eligibility_score >= 0.8).length.toLocaleString()}{' '}
                voters
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* At-Risk Summary & Top/Bottom Precincts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* At-Risk Summary Panel */}
        <div className={`border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} rounded-lg shadow-md overflow-hidden`}>
          <div className={`px-4 py-3 ${darkMode ? 'bg-gray-900 border-b border-gray-700' : 'bg-gray-50 border-b border-gray-200'}`}>
            <div className="flex items-center">
              <InfoIcon className={`h-4 w-4 mr-2 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
              <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                At-Risk Voter Summary
              </h3>
            </div>
          </div>
          <div className="p-4">
            <div className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="text-3xl font-bold text-red-500">
                {atRiskSummary.atRisk.toLocaleString()}
              </div>
              <div className="text-sm mt-1">
                At-Risk Voters in {getRegionName(region)}
              </div>
              <div className="mt-4 flex items-center justify-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${atRiskSummary.atRiskPct > 30 ? 'border-red-500' : atRiskSummary.atRiskPct > 15 ? 'border-yellow-500' : 'border-green-500'}`}>
                  <div className="text-xl font-bold">
                    {atRiskSummary.atRiskPct.toFixed(1)}%
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between">
                  <span>Total Voters:</span>
                  <span className="font-medium">
                    {atRiskSummary.total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>At-Risk (Score &lt; 50%):</span>
                  <span className="font-medium">
                    {atRiskSummary.atRisk.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Percentage At-Risk:</span>
                  <span className={`font-medium ${atRiskSummary.atRiskPct > 30 ? 'text-red-500' : atRiskSummary.atRiskPct > 15 ? 'text-yellow-500' : 'text-green-500'}`}>
                    {atRiskSummary.atRiskPct.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Top Precincts */}
        <div className={`border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} rounded-lg shadow-md overflow-hidden`}>
          <div className={`px-4 py-3 ${darkMode ? 'bg-green-900 border-b border-gray-700' : 'bg-green-50 border-b border-gray-200'}`}>
            <h3 className={`text-sm font-medium ${darkMode ? 'text-green-100' : 'text-green-800'}`}>
              Top 5 Precincts by Eligibility Score
            </h3>
          </div>
          <div className="p-4">
            <ul className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {precincts.features.sort((a, b) => b.properties.avgScore - a.properties.avgScore).slice(0, 5).map((precinct, index) => <li key={index} className="py-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          {precinct.properties.name}
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {precinct.properties.municipality}
                        </div>
                      </div>
                      <div className={`text-green-500 font-bold px-2 py-0.5 rounded ${darkMode ? 'bg-green-900 bg-opacity-30' : 'bg-green-50'}`}>
                        {(precinct.properties.avgScore * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div className={`text-xs mt-1 flex justify-between ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span>
                        BIPOC: {precinct.properties.bipocPct.toFixed(1)}%
                      </span>
                      <span>At-Risk: {precinct.properties.atRiskVoters}</span>
                    </div>
                  </li>)}
            </ul>
          </div>
        </div>
        {/* Bottom Precincts */}
        <div className={`border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} rounded-lg shadow-md overflow-hidden`}>
          <div className={`px-4 py-3 ${darkMode ? 'bg-red-900 border-b border-gray-700' : 'bg-red-50 border-b border-gray-200'}`}>
            <h3 className={`text-sm font-medium ${darkMode ? 'text-red-100' : 'text-red-800'}`}>
              Bottom 5 Precincts by Eligibility Score
            </h3>
          </div>
          <div className="p-4">
            <ul className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {precincts.features.sort((a, b) => a.properties.avgScore - b.properties.avgScore).slice(0, 5).map((precinct, index) => <li key={index} className="py-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          {precinct.properties.name}
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {precinct.properties.municipality}
                        </div>
                      </div>
                      <div className={`text-red-500 font-bold px-2 py-0.5 rounded ${darkMode ? 'bg-red-900 bg-opacity-30' : 'bg-red-50'}`}>
                        {(precinct.properties.avgScore * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div className={`text-xs mt-1 flex justify-between ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span>
                        BIPOC: {precinct.properties.bipocPct.toFixed(1)}%
                      </span>
                      <span>At-Risk: {precinct.properties.atRiskVoters}</span>
                    </div>
                  </li>)}
            </ul>
          </div>
        </div>
      </div>
      {/* Download Buttons */}
      <div className="flex justify-end space-x-3">
        <button onClick={exportCSV} className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}>
          <DownloadIcon size={16} className="mr-2" />
          Export CSV
        </button>
        <button onClick={exportGeoJSON} className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${darkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
          <DownloadIcon size={16} className="mr-2" />
          Export GeoJSON
        </button>
        <button className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
          <DownloadIcon size={16} className="mr-2" />
          Export Map Image
        </button>
      </div>
    </div>;
};
export default AnalyticsCells;