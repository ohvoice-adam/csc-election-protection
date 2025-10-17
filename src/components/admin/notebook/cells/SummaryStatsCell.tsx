import React from 'react';
import { BarChartIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
const SummaryStatsCell: React.FC = () => {
  // Mock data for summary statistics
  const summaryStats = {
    statewide: {
      avgScore: 0.79,
      totalVoters: 5.2,
      changeFromPrevious: 0.03
    },
    topPrecincts: [{
      name: 'Arlington Precinct 1',
      county: 'Arlington',
      score: 0.92
    }, {
      name: 'Fairfax Precinct 3',
      county: 'Fairfax',
      score: 0.89
    }, {
      name: 'Charlottesville Precinct 2',
      county: 'Charlottesville',
      score: 0.88
    }, {
      name: 'Virginia Beach Precinct 5',
      county: 'Virginia Beach',
      score: 0.87
    }, {
      name: 'Fairfax Precinct 1',
      county: 'Fairfax',
      score: 0.87
    }],
    bottomPrecincts: [{
      name: 'Petersburg Precinct 2',
      county: 'Petersburg',
      score: 0.65
    }, {
      name: 'Richmond Precinct 7',
      county: 'Richmond City',
      score: 0.66
    }, {
      name: 'Norfolk Precinct 3',
      county: 'Norfolk',
      score: 0.67
    }, {
      name: 'Norfolk Precinct 1',
      county: 'Norfolk',
      score: 0.68
    }, {
      name: 'Roanoke Precinct 4',
      county: 'Roanoke',
      score: 0.69
    }]
  };
  return <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Statewide Average Score
              </p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">
                {(summaryStats.statewide.avgScore * 100).toFixed(1)}%
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <BarChartIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {summaryStats.statewide.changeFromPrevious > 0 ? <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" /> : <TrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />}
            <span className="text-sm font-medium text-gray-500">
              {summaryStats.statewide.changeFromPrevious > 0 ? '+' : ''}
              {(summaryStats.statewide.changeFromPrevious * 100).toFixed(1)}%
              from previous
            </span>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Registered Voters
              </p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">
                {summaryStats.statewide.totalVoters.toFixed(1)}M
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <BarChartIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-sm font-medium text-gray-500">
            Across all Virginia precincts
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Score Variance
              </p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">27%</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <BarChartIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 text-sm font-medium text-gray-500">
            Between highest and lowest precincts
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-green-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-green-800">
              Top 5 Precincts by Eligibility Score
            </h3>
          </div>
          <div className="px-4 py-3">
            <ul className="divide-y divide-gray-200">
              {summaryStats.topPrecincts.map((precinct, index) => <li key={index} className="py-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {precinct.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {precinct.county} County
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-green-600">
                    {(precinct.score * 100).toFixed(1)}%
                  </div>
                </li>)}
            </ul>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-red-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-red-800">
              Bottom 5 Precincts by Eligibility Score
            </h3>
          </div>
          <div className="px-4 py-3">
            <ul className="divide-y divide-gray-200">
              {summaryStats.bottomPrecincts.map((precinct, index) => <li key={index} className="py-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {precinct.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {precinct.county} County
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-red-600">
                    {(precinct.score * 100).toFixed(1)}%
                  </div>
                </li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>;
};
export default SummaryStatsCell;