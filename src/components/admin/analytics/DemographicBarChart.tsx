import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
interface DemographicBarChartProps {
  precinct: any;
  darkMode: boolean;
}
const DemographicBarChart: React.FC<DemographicBarChartProps> = ({
  precinct,
  darkMode
}) => {
  // Format the data for the chart
  const formatChartData = () => {
    const {
      demographics,
      avgScore
    } = precinct;
    return [{
      name: 'African American',
      population: demographics.black.population,
      atRiskVoters: demographics.black.atRiskVoters,
      percentage: (demographics.black.population / precinct.affectedPopulation * 100).toFixed(1),
      score: demographics.black.avgScore
    }, {
      name: 'White',
      population: demographics.white.population,
      atRiskVoters: demographics.white.atRiskVoters,
      percentage: (demographics.white.population / precinct.affectedPopulation * 100).toFixed(1),
      score: demographics.white.avgScore
    }, {
      name: 'Hispanic',
      population: demographics.hispanic.population,
      atRiskVoters: demographics.hispanic.atRiskVoters,
      percentage: (demographics.hispanic.population / precinct.affectedPopulation * 100).toFixed(1),
      score: demographics.hispanic.avgScore
    }, {
      name: 'AAPI',
      population: demographics.asian.population,
      atRiskVoters: demographics.asian.atRiskVoters,
      percentage: (demographics.asian.population / precinct.affectedPopulation * 100).toFixed(1),
      score: demographics.asian.avgScore
    }, {
      name: 'Other',
      population: 0,
      atRiskVoters: 0,
      percentage: '0.0',
      score: 0
    }];
  };
  const data = formatChartData();
  const maxPopulation = Math.max(...data.map(d => d.population));
  // Custom tooltip component
  const CustomTooltip = ({
    active,
    payload,
    label
  }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return <div className={`p-3 rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <p className="font-bold">{label}</p>
          <p className="text-sm">Count: {item.population.toLocaleString()}</p>
          <p className="text-sm">Percentage: {item.percentage}%</p>
          <p className="text-sm">
            At-Risk Voters: {item.atRiskVoters.toLocaleString()}
          </p>
          <p className="text-sm">
            Eligibility Score: {(item.score * 100).toFixed(1)}%
          </p>
        </div>;
    }
    return null;
  };
  // Custom tooltip for risk score line
  const RiskScoreTooltip = ({
    active,
    payload,
    label
  }: any) => {
    if (active && payload && payload.length) {
      return <div className={`p-3 rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <p className="font-bold">Median At-Risk Score</p>
          <p className="text-sm">{(precinct.avgScore * 100).toFixed(1)}%</p>
        </div>;
    }
    return null;
  };
  // Color scheme that is colorblind-friendly
  const colors = {
    africanAmerican: '#0072B2',
    white: '#56B4E9',
    hispanic: '#CC79A7',
    aapi: '#009E73',
    other: '#F0E442',
    riskLine: '#D55E00' // Red/orange
  };
  return <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={data} margin={{
        top: 20,
        right: 30,
        left: 80,
        bottom: 5
      }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke={darkMode ? '#374151' : '#e5e7eb'} />
          <XAxis type="number" domain={[0, maxPopulation * 1.1]} // Add 10% padding to max
        tick={{
          fill: darkMode ? '#e5e7eb' : '#4b5563'
        }} />
          <YAxis type="category" dataKey="name" tick={{
          fill: darkMode ? '#e5e7eb' : '#4b5563'
        }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="population" name="Population" fill={colors.africanAmerican} radius={[0, 4, 4, 0]} />
          <Bar dataKey="atRiskVoters" name="At-Risk Voters" fill={colors.hispanic} radius={[0, 4, 4, 0]} />
          <ReferenceLine x={precinct.affectedPopulation * precinct.avgScore} stroke={colors.riskLine} strokeDasharray="5 5" label={{
          value: `Median Risk Score: ${(precinct.avgScore * 100).toFixed(1)}%`,
          position: 'insideTopRight',
          fill: darkMode ? '#e5e7eb' : '#4b5563',
          fontSize: 12
        }} />
        </BarChart>
      </ResponsiveContainer>
    </div>;
};
export default DemographicBarChart;