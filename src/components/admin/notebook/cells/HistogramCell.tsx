import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
const HistogramCell: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  // Mock data for the histogram
  const generateHistogramData = () => {
    // Generate a normal-ish distribution centered around 0.75
    const data = [];
    const mean = 0.75;
    const stdDev = 0.15;
    // Generate 1000 voter scores
    for (let i = 0; i < 1000; i++) {
      // Box-Muller transform for normal distribution
      const u1 = Math.random();
      const u2 = Math.random();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      let score = mean + z * stdDev;
      // Clamp between 0 and 1
      score = Math.max(0, Math.min(1, score));
      data.push(score);
    }
    return data;
  };
  useEffect(() => {
    if (!chartRef.current) return;
    // Clear any existing chart
    d3.select(chartRef.current).selectAll('*').remove();
    // Generate data
    const data = generateHistogramData();
    // Set up dimensions
    const margin = {
      top: 20,
      right: 30,
      bottom: 40,
      left: 40
    };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    // Create SVG
    const svg = d3.select(chartRef.current).append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    // X scale
    const x = d3.scaleLinear().domain([0, 1]).range([0, width]);
    // Create histogram
    const histogram = d3.histogram().value(d => d).domain(x.domain()).thresholds(x.ticks(20));
    // Apply histogram function to data
    const bins = histogram(data);
    // Y scale
    const y = d3.scaleLinear().domain([0, d3.max(bins, d => d.length) || 0]).range([height, 0]);
    // Add X axis
    svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x).tickFormat(d => `${d * 100}%`)).selectAll('text').style('text-anchor', 'middle');
    // Add X axis label
    svg.append('text').attr('text-anchor', 'middle').attr('x', width / 2).attr('y', height + margin.bottom - 5).style('font-size', '12px').text('Voter Eligibility Score');
    // Add Y axis
    svg.append('g').call(d3.axisLeft(y));
    // Add Y axis label
    svg.append('text').attr('text-anchor', 'middle').attr('transform', 'rotate(-90)').attr('y', -margin.left + 10).attr('x', -height / 2).style('font-size', '12px').text('Number of Voters');
    // Add bars
    svg.selectAll('rect').data(bins).enter().append('rect').attr('x', d => x(d.x0 || 0)).attr('width', d => Math.max(0, x(d.x1 || 0) - x(d.x0 || 0) - 1)).attr('y', d => y(d.length)).attr('height', d => height - y(d.length)).style('fill', d => {
      const midpoint = (d.x0 || 0) + ((d.x1 || 0) - (d.x0 || 0)) / 2;
      if (midpoint >= 0.8) return '#10B981'; // Green for high scores
      if (midpoint >= 0.6) return '#FBBF24'; // Yellow for medium scores
      return '#EF4444'; // Red for low scores
    }).style('opacity', 0.8);
    // Add mean line
    const meanValue = d3.mean(data) || 0;
    svg.append('line').attr('x1', x(meanValue)).attr('x2', x(meanValue)).attr('y1', 0).attr('y2', height).style('stroke', '#3B82F6').style('stroke-width', 2).style('stroke-dasharray', '5,5');
    // Add mean label
    svg.append('text').attr('x', x(meanValue)).attr('y', 0).attr('text-anchor', 'middle').style('font-size', '12px').style('fill', '#3B82F6').text(`Mean: ${(meanValue * 100).toFixed(1)}%`);
  }, []);
  return <div>
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700">
          Distribution of Voter Eligibility Scores
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Histogram showing the distribution of eligibility scores across all
          registered voters in Virginia.
        </p>
      </div>
      <div ref={chartRef} className="w-full h-[300px]"></div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center text-xs">
        <div>
          <div className="font-medium text-gray-700">Low Scores (0-60%)</div>
          <div className="text-red-600 font-semibold">18% of voters</div>
        </div>
        <div>
          <div className="font-medium text-gray-700">
            Medium Scores (60-80%)
          </div>
          <div className="text-yellow-600 font-semibold">42% of voters</div>
        </div>
        <div>
          <div className="font-medium text-gray-700">High Scores (80-100%)</div>
          <div className="text-green-600 font-semibold">40% of voters</div>
        </div>
      </div>
    </div>;
};
export default HistogramCell;