import React from 'react';
import VoterEligibilityNotebook from './analytics/VoterEligibilityNotebook';
const AnalyticsPanel: React.FC = () => {
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Analytics Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Interactive data notebook for analyzing voter eligibility and
          demographics across Virginia.
        </p>
      </div>
      <VoterEligibilityNotebook />
    </div>;
};
export default AnalyticsPanel;