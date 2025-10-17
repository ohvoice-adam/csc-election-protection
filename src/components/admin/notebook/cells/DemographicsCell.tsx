import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
const DemographicsCell: React.FC = () => {
  const raceChartRef = useRef<HTMLDivElement>(null);
  const genderChartRef = useRef<HTMLDivElement>(null);
  const [selectedView, setSelectedView] = useState<'race' | 'gender'>('race');
  // Mock data for demographic analysis
  const demographicData = {
    race: [{
      group: 'White',
      avgScore: 0.82,
      count: 3200000
    }, {
      group: 'Black',
      avgScore: 0.74,
      count: 1500000
    }, {
      group: 'Hispanic',
      avgScore: 0.76,
      count: 800000
    }, {
      group: 'Asian',
      avgScore: 0.84,
      count: 500000
    }, {
      group: 'Other',
      avgScore: 0.78,
      count: 200000
    }],
    gender: [{
      group: 'Male',
      avgScore: 0.77,
      count: 2500000
    }, {
      group: 'Female',
      avgScore: 0.81,
      count: 2700000
    }]
  };
  const drawBarChart = (ref: React.RefObject<HTMLDivElement>, data: Array<{
    group: string;
    avgScore: number;
    count: number;
  }>, title: string) => {
    if (!ref.current) return;
    // Clear any existing chart
    d3.select(ref.current).selectAll('*').remove();
    // Set up dimensions
    const margin = {
      top: 30,
      right: 30,
      bottom: 60,
      left: 60
    };
    const width = ref.current.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    // Create SVG
    const svg = d3.select(ref.current).append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    // Add title
    svg.append('text').attr('x', width / 2).attr('y', -10).attr('text-anchor', 'middle').style('font-size', '14px').style('font-weight', 'bold').text(title);
    // X scale
    const x = d3.scaleBand().domain(data.map(d => d.group)).range([0, width]).padding(0.2);
    // Y scale
    const y = d3.scaleLinear().domain([0, 1]).range([height, 0]);
    // Add X axis
    svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x)).selectAll('text').style('text-anchor', 'middle');
    // Add Y axis
    svg.append('g').call(d3.axisLeft(y).tickFormat(d => `${d * 100}%`));
    // Y axis label
    svg.append('text').attr('text-anchor', 'middle').attr('transform', 'rotate(-90)').attr('y', -margin.left + 15).attr('x', -height / 2).style('font-size', '12px').text('Average Eligibility Score');
    // Add bars
    svg.selectAll('mybar').data(data).enter().append('rect').attr('x', d => x(d.group) || 0).attr('width', x.bandwidth()).attr('y', d => y(d.avgScore)).attr('height', d => height - y(d.avgScore)).attr('fill', d => {
      if (d.avgScore >= 0.8) return '#10B981'; // Green for high scores
      if (d.avgScore >= 0.7) return '#FBBF24'; // Yellow for medium scores
      return '#EF4444'; // Red for low scores
    });
    // Add count labels
    svg.selectAll('mytext').data(data).enter().append('text').attr('x', d => (x(d.group) || 0) + x.bandwidth() / 2).attr('y', d => y(d.avgScore) - 5).attr('text-anchor', 'middle').style('font-size', '10px').text(d => {
      const count = d.count >= 1000000 ? `${(d.count / 1000000).toFixed(1)}M` : `${(d.count / 1000).toFixed(0)}K`;
      return count;
    });
    // Add score labels
    svg.selectAll('myscores').data(data).enter().append('text').attr('x', d => (x(d.group) || 0) + x.bandwidth() / 2).attr('y', d => y(d.avgScore) + 15).attr('text-anchor', 'middle').style('font-size', '11px').style('fill', 'white').style('font-weight', 'bold').text(d => `${(d.avgScore * 100).toFixed(0)}%`);
    // Add statewide average line
    const statewideAvg = 0.79;
    svg.append('line').attr('x1', 0).attr('x2', width).attr('y1', y(statewideAvg)).attr('y2', y(statewideAvg)).style('stroke', '#3B82F6').style('stroke-width', 2).style('stroke-dasharray', '5,5');
    // Add statewide average label
    svg.append('text').attr('x', width).attr('y', y(statewideAvg) - 5).attr('text-anchor', 'end').style('font-size', '11px').style('fill', '#3B82F6').text(`Statewide Avg: ${(statewideAvg * 100).toFixed(1)}%`);
  };
  useEffect(() => {
    drawBarChart(raceChartRef, demographicData.race, 'Average Eligibility Score by Race/Ethnicity');
    drawBarChart(genderChartRef, demographicData.gender, 'Average Eligibility Score by Gender');
  }, []);
  return <div>
      <div className="mb-6">
        <div className="inline-flex rounded-md shadow-sm mb-4" role="group">
          <button type="button" className={`px-4 py-2 text-sm font-medium rounded-l-lg ${selectedView === 'race' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedView('race')}>
            Race/Ethnicity
          </button>
          <button type="button" className={`px-4 py-2 text-sm font-medium rounded-r-lg ${selectedView === 'gender' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedView('gender')}>
            Gender
          </button>
        </div>
        <div className={selectedView === 'race' ? 'block' : 'hidden'}>
          <div ref={raceChartRef} className="w-full h-[300px]"></div>
          <div className="mt-4 text-sm text-gray-700">
            <p className="mb-2">
              <strong>Key Insights:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Asian voters have the highest average eligibility score (84%)
              </li>
              <li>
                Black voters have the lowest average eligibility score (74%)
              </li>
              <li>
                The gap between highest and lowest demographic groups is 10
                percentage points
              </li>
              <li>
                White voters represent the largest voter group with 3.2M
                registered voters
              </li>
            </ul>
          </div>
        </div>
        <div className={selectedView === 'gender' ? 'block' : 'hidden'}>
          <div ref={genderChartRef} className="w-full h-[300px]"></div>
          <div className="mt-4 text-sm text-gray-700">
            <p className="mb-2">
              <strong>Key Insights:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Female voters have a higher average eligibility score (81%) than
                male voters (77%)
              </li>
              <li>
                There are slightly more registered female voters (2.7M) than
                male voters (2.5M)
              </li>
              <li>
                The gender gap in eligibility scores is 4 percentage points
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          Potential Actions
        </h3>
        <p className="text-sm text-blue-700 mb-2">
          Based on the demographic analysis, consider the following targeted
          interventions:
        </p>
        <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
          <li>
            Focused voter education programs in communities with lower
            eligibility scores
          </li>
          <li>
            Targeted registration drives in areas with high Black and Hispanic
            populations
          </li>
          <li>
            Multilingual voter information materials in areas with diverse
            populations
          </li>
          <li>Mobile registration units in underserved communities</li>
        </ul>
      </div>
    </div>;
};
export default DemographicsCell;