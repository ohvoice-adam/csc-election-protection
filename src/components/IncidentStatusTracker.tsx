import React, { useState } from 'react';
import { CheckCircleIcon, ClockIcon, AlertTriangleIcon, XCircleIcon, ArrowRightIcon, RefreshCwIcon } from 'lucide-react';
// Define the possible status types
export type IncidentStatus = 'reported' | 'investigating' | 'resolved' | 'closed';
// Define the incident type with status history
export type Incident = {
  id: string;
  title: string;
  location: string;
  description: string;
  currentStatus: IncidentStatus;
  statusHistory: {
    status: IncidentStatus;
    timestamp: Date;
    updatedBy?: string;
    notes?: string;
  }[];
  reportedAt: Date;
  reportedBy: string;
};
// Sample data for incidents
const sampleIncidents: Incident[] = [{
  id: 'INC-001',
  title: 'Long wait times',
  location: 'Fairfax High School, Precinct 1',
  description: 'Voters reporting 2+ hour wait times at this location',
  currentStatus: 'investigating',
  statusHistory: [{
    status: 'reported',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    updatedBy: 'John Doe'
  }, {
    status: 'investigating',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    updatedBy: 'Admin Sarah',
    notes: 'Dispatched team to assess the situation'
  }],
  reportedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  reportedBy: 'John Doe'
}, {
  id: 'INC-002',
  title: 'Accessibility issue',
  location: 'Richmond Convention Center, Precinct 2',
  description: 'Wheelchair ramp is blocked by construction',
  currentStatus: 'resolved',
  statusHistory: [{
    status: 'reported',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    updatedBy: 'Jane Smith'
  }, {
    status: 'investigating',
    timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
    updatedBy: 'Admin Mike',
    notes: 'Contacting facility management'
  }, {
    status: 'resolved',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    updatedBy: 'Admin Mike',
    notes: 'Construction crew moved equipment to clear access'
  }],
  reportedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
  reportedBy: 'Jane Smith'
}, {
  id: 'INC-003',
  title: 'Voting machine malfunction',
  location: 'Chesterfield Elementary, Precinct 1',
  description: 'Two voting machines are not accepting ballots',
  currentStatus: 'reported',
  statusHistory: [{
    status: 'reported',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    updatedBy: 'Robert Johnson'
  }],
  reportedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  reportedBy: 'Robert Johnson'
}, {
  id: 'INC-004',
  title: 'Voter ID dispute',
  location: 'Roanoke Library, Precinct 1',
  description: 'Voters being turned away due to ID requirements confusion',
  currentStatus: 'closed',
  statusHistory: [{
    status: 'reported',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    updatedBy: 'Maria Garcia'
  }, {
    status: 'investigating',
    timestamp: new Date(Date.now() - 11 * 60 * 60 * 1000),
    updatedBy: 'Admin Sarah',
    notes: 'Contacting poll workers for clarification'
  }, {
    status: 'resolved',
    timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000),
    updatedBy: 'Admin Sarah',
    notes: 'Provided poll workers with correct ID requirements'
  }, {
    status: 'closed',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    updatedBy: 'Admin Sarah',
    notes: 'Verified resolution and closed incident'
  }],
  reportedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  reportedBy: 'Maria Garcia'
}];
// Status display configuration
const statusConfig = {
  reported: {
    label: 'Reported',
    icon: AlertTriangleIcon,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800'
  },
  investigating: {
    label: 'Investigating',
    icon: ClockIcon,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800'
  },
  resolved: {
    label: 'Resolved',
    icon: CheckCircleIcon,
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800'
  },
  closed: {
    label: 'Closed',
    icon: XCircleIcon,
    color: 'text-gray-500',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800'
  }
};
const IncidentStatusTracker: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(sampleIncidents);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState<{
    status: IncidentStatus;
    notes: string;
  }>({
    status: 'investigating',
    notes: ''
  });
  // Format date for display
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };
  // Handle opening the update modal
  const handleUpdateClick = (incident: Incident) => {
    setSelectedIncident(incident);
    setShowUpdateModal(true);
    // Set default next status based on current status
    let nextStatus: IncidentStatus = 'investigating';
    switch (incident.currentStatus) {
      case 'reported':
        nextStatus = 'investigating';
        break;
      case 'investigating':
        nextStatus = 'resolved';
        break;
      case 'resolved':
        nextStatus = 'closed';
        break;
      case 'closed':
        nextStatus = 'reported'; // Reopen if needed
        break;
    }
    setStatusUpdate({
      status: nextStatus,
      notes: ''
    });
  };
  // Handle status update submission
  const handleUpdateSubmit = () => {
    if (!selectedIncident) return;
    const updatedIncidents = incidents.map(incident => {
      if (incident.id === selectedIncident.id) {
        const newStatusHistory = [...incident.statusHistory, {
          status: statusUpdate.status,
          timestamp: new Date(),
          updatedBy: 'Admin User',
          notes: statusUpdate.notes
        }];
        return {
          ...incident,
          currentStatus: statusUpdate.status,
          statusHistory: newStatusHistory
        };
      }
      return incident;
    });
    setIncidents(updatedIncidents);
    setShowUpdateModal(false);
    setSelectedIncident(null);
  };
  // Render status badge
  const StatusBadge = ({
    status
  }: {
    status: IncidentStatus;
  }) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </span>;
  };
  return <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Incident Tracker</h2>
        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <RefreshCwIcon className="h-4 w-4 mr-1" />
          Refresh
        </button>
      </div>
      <p className="text-gray-600 mb-6">
        Track and update the status of reported incidents in real-time.
      </p>
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Incident
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reported
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Update
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {incidents.map(incident => <tr key={incident.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {incident.title}
                  </div>
                  <div className="text-sm text-gray-500">{incident.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {incident.location}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={incident.currentStatus} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(incident.reportedAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(incident.statusHistory[incident.statusHistory.length - 1].timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleUpdateClick(incident)} className="text-blue-600 hover:text-blue-900">
                    Update
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      {/* Status History Section - Appears when an incident is clicked */}
      {selectedIncident && <div className="mt-6 border rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Status History - {selectedIncident.title}
          </h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {selectedIncident.statusHistory.map((statusItem, index) => {
            const isLast = index === selectedIncident.statusHistory.length - 1;
            const config = statusConfig[statusItem.status];
            const StatusIcon = config.icon;
            return <li key={index}>
                    <div className="relative pb-8">
                      {!isLast && <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${config.bgColor}`}>
                            <StatusIcon className={`h-5 w-5 ${config.color}`} aria-hidden="true" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Status changed to{' '}
                              <span className="font-medium text-gray-900">
                                {config.label}
                              </span>
                              {statusItem.notes && <span className="ml-2 font-normal text-gray-500">
                                  — {statusItem.notes}
                                </span>}
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <div>{formatDate(statusItem.timestamp)}</div>
                            <div className="text-xs">
                              by {statusItem.updatedBy}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>;
          })}
            </ul>
          </div>
        </div>}
      {/* Update Status Modal */}
      {showUpdateModal && selectedIncident && <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-30" onClick={() => setShowUpdateModal(false)}></div>
          <div className="relative bg-white rounded-lg max-w-lg w-full mx-4 p-6 shadow-xl">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Update Incident Status
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {selectedIncident.id} - {selectedIncident.title}
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Status
                </label>
                <StatusBadge status={selectedIncident.currentStatus} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Status
                </label>
                <select value={statusUpdate.status} onChange={e => setStatusUpdate({
              ...statusUpdate,
              status: e.target.value as IncidentStatus
            })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  {Object.entries(statusConfig).map(([key, config]) => <option key={key} value={key}>
                      {config.label}
                    </option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Update Notes
                </label>
                <textarea value={statusUpdate.notes} onChange={e => setStatusUpdate({
              ...statusUpdate,
              notes: e.target.value
            })} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Provide details about this status change..."></textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button type="button" onClick={() => setShowUpdateModal(false)} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Cancel
              </button>
              <button type="button" onClick={handleUpdateSubmit} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Update Status
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default IncidentStatusTracker;