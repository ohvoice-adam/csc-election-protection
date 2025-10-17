import React, { useState } from 'react';
import { AlertTriangleIcon, CheckCircleIcon, ClockIcon, XCircleIcon, FilterIcon, SearchIcon, FlagIcon, ShieldCheckIcon } from 'lucide-react';
// Define the incident data structure
interface IncidentUpdate {
  status: string;
  timestamp: Date;
  updatedBy: string;
  notes?: string;
}
interface Incident {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  currentStatus: string;
  verificationStatus: 'Unverified' | 'Verified';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  reportedAt: Date;
  reportedBy: string;
  updates: IncidentUpdate[];
}
const IncidentManagement: React.FC = () => {
  // Sample incidents data
  const initialIncidents: Incident[] = [{
    id: 'INC-001',
    title: 'Long wait times',
    location: 'Fairfax High School, Precinct 1',
    type: 'Long Line',
    description: 'Voters reporting 2+ hour wait times at this location',
    currentStatus: 'Investigating',
    verificationStatus: 'Verified',
    priority: 'High',
    reportedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    reportedBy: 'John Doe',
    updates: [{
      status: 'Reported',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      updatedBy: 'John Doe'
    }, {
      status: 'Investigating',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      updatedBy: 'Admin Sarah',
      notes: 'Dispatched team to assess the situation'
    }]
  }, {
    id: 'INC-002',
    title: 'Accessibility issue',
    location: 'Richmond Convention Center, Precinct 2',
    type: 'Accessibility',
    description: 'Wheelchair ramp is blocked by construction',
    currentStatus: 'Resolved',
    verificationStatus: 'Verified',
    priority: 'Medium',
    reportedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    reportedBy: 'Jane Smith',
    updates: [{
      status: 'Reported',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      updatedBy: 'Jane Smith'
    }, {
      status: 'Investigating',
      timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
      updatedBy: 'Admin Mike',
      notes: 'Contacting facility management'
    }, {
      status: 'Resolved',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      updatedBy: 'Admin Mike',
      notes: 'Construction crew moved equipment to clear access'
    }]
  }, {
    id: 'INC-003',
    title: 'Voter intimidation reported',
    location: 'Norfolk State University, Precinct 1',
    type: 'Intimidation',
    description: 'Group of people standing near entrance asking voters who they voted for',
    currentStatus: 'Reported',
    verificationStatus: 'Unverified',
    priority: 'Critical',
    reportedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    reportedBy: 'Robert Johnson',
    updates: [{
      status: 'Reported',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      updatedBy: 'Robert Johnson'
    }]
  }, {
    id: 'INC-004',
    title: 'Aggressive electioneering',
    location: 'Roanoke Library, Precinct 1',
    type: 'Aggressive Electioneering',
    description: 'Campaign workers approaching voters within 50 feet of polling place entrance',
    currentStatus: 'Closed',
    verificationStatus: 'Verified',
    priority: 'Low',
    reportedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    reportedBy: 'Maria Garcia',
    updates: [{
      status: 'Reported',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      updatedBy: 'Maria Garcia'
    }, {
      status: 'Investigating',
      timestamp: new Date(Date.now() - 11 * 60 * 60 * 1000),
      updatedBy: 'Admin Sarah',
      notes: 'Contacting poll workers for clarification'
    }, {
      status: 'Resolved',
      timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000),
      updatedBy: 'Admin Sarah',
      notes: 'Asked campaign workers to move back beyond the legal limit'
    }, {
      status: 'Closed',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      updatedBy: 'Admin Sarah',
      notes: 'Verified resolution and closed incident'
    }]
  }];
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [verificationFilter, setVerificationFilter] = useState('');
  const [updateForm, setUpdateForm] = useState({
    status: '',
    notes: '',
    priority: '',
    verificationStatus: ''
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
  // Filter incidents based on search and filters
  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.id.toLowerCase().includes(searchTerm.toLowerCase()) || incident.title.toLowerCase().includes(searchTerm.toLowerCase()) || incident.location.toLowerCase().includes(searchTerm.toLowerCase()) || incident.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? incident.currentStatus === statusFilter : true;
    const matchesPriority = priorityFilter ? incident.priority === priorityFilter : true;
    const matchesVerification = verificationFilter ? incident.verificationStatus === verificationFilter : true;
    return matchesSearch && matchesStatus && matchesPriority && matchesVerification;
  });
  const handleUpdateClick = (incident: Incident) => {
    setSelectedIncident(incident);
    setUpdateForm({
      status: incident.currentStatus,
      notes: '',
      priority: incident.priority,
      verificationStatus: incident.verificationStatus
    });
    setShowUpdateModal(true);
  };
  const handleUpdateSubmit = () => {
    if (!selectedIncident) return;
    const updatedIncidents = incidents.map(incident => {
      if (incident.id === selectedIncident.id) {
        // Create a new update record if status changed
        const updates = [...incident.updates];
        if (updateForm.status !== incident.currentStatus) {
          updates.push({
            status: updateForm.status,
            timestamp: new Date(),
            updatedBy: 'Admin User',
            notes: updateForm.notes
          });
        }
        return {
          ...incident,
          currentStatus: updateForm.status,
          priority: updateForm.priority as 'Low' | 'Medium' | 'High' | 'Critical',
          verificationStatus: updateForm.verificationStatus as 'Unverified' | 'Verified',
          updates
        };
      }
      return incident;
    });
    setIncidents(updatedIncidents);
    setShowUpdateModal(false);
    setSelectedIncident(null);
  };
  // Status badge component
  const StatusBadge = ({
    status
  }: {
    status: string;
  }) => {
    let bgColor = 'bg-gray-100';
    let textColor = 'text-gray-800';
    let Icon = AlertTriangleIcon;
    switch (status) {
      case 'Reported':
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-800';
        Icon = AlertTriangleIcon;
        break;
      case 'Investigating':
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-800';
        Icon = ClockIcon;
        break;
      case 'Resolved':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        Icon = CheckCircleIcon;
        break;
      case 'Closed':
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
        Icon = XCircleIcon;
        break;
    }
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </span>;
  };
  // Priority badge component
  const PriorityBadge = ({
    priority
  }: {
    priority: string;
  }) => {
    let bgColor = 'bg-gray-100';
    let textColor = 'text-gray-800';
    switch (priority) {
      case 'Low':
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-800';
        break;
      case 'Medium':
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-800';
        break;
      case 'High':
        bgColor = 'bg-orange-100';
        textColor = 'text-orange-800';
        break;
      case 'Critical':
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
        break;
    }
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        <FlagIcon className="h-3 w-3 mr-1" />
        {priority}
      </span>;
  };
  // Verification badge component
  const VerificationBadge = ({
    status
  }: {
    status: string;
  }) => {
    const bgColor = status === 'Verified' ? 'bg-green-100' : 'bg-gray-100';
    const textColor = status === 'Verified' ? 'text-green-800' : 'text-gray-800';
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        <ShieldCheckIcon className="h-3 w-3 mr-1" />
        {status}
      </span>;
  };
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Incident Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View, update, and manage incident reports.
        </p>
      </div>
      {/* Filters and Search */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Search incidents..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <select className="block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="Reported">Reported</option>
              <option value="Investigating">Investigating</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
            <select className="block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
            <select className="block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={verificationFilter} onChange={e => setVerificationFilter(e.target.value)}>
              <option value="">All Verification</option>
              <option value="Unverified">Unverified</option>
              <option value="Verified">Verified</option>
            </select>
          </div>
        </div>
      </div>
      {/* Incidents Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredIncidents.map(incident => <li key={incident.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {incident.title}
                    </p>
                    <p className="text-xs text-gray-500 sm:ml-2">
                      #{incident.id}
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 gap-2">
                    <StatusBadge status={incident.currentStatus} />
                    <PriorityBadge priority={incident.priority} />
                    <VerificationBadge status={incident.verificationStatus} />
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex gap-4">
                    <p className="flex items-center text-sm text-gray-500">
                      <AlertTriangleIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {incident.type}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <ClockIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {formatDate(incident.reportedAt)}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>{incident.location}</p>
                    <button onClick={() => handleUpdateClick(incident)} className="ml-4 text-sm text-blue-600 hover:text-blue-500">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </li>)}
        </ul>
      </div>
      {/* Update Modal */}
      {showUpdateModal && selectedIncident && <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-30" onClick={() => setShowUpdateModal(false)}></div>
          <div className="relative bg-white rounded-lg max-w-lg w-full mx-4 p-6 shadow-xl">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Update Incident
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {selectedIncident.id} - {selectedIncident.title}
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select value={updateForm.status} onChange={e => setUpdateForm({
              ...updateForm,
              status: e.target.value
            })} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="Reported">Reported</option>
                  <option value="Investigating">Investigating</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select value={updateForm.priority} onChange={e => setUpdateForm({
              ...updateForm,
              priority: e.target.value
            })} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Status
                </label>
                <select value={updateForm.verificationStatus} onChange={e => setUpdateForm({
              ...updateForm,
              verificationStatus: e.target.value
            })} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="Unverified">Unverified</option>
                  <option value="Verified">Verified</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Update Notes
                </label>
                <textarea value={updateForm.notes} onChange={e => setUpdateForm({
              ...updateForm,
              notes: e.target.value
            })} rows={3} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Provide details about this update..."></textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button type="button" onClick={() => setShowUpdateModal(false)} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Cancel
              </button>
              <button type="button" onClick={handleUpdateSubmit} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Update Incident
              </button>
            </div>
          </div>
        </div>}
      {/* Incident History Section - Shows when an incident is selected but modal is closed */}
      {selectedIncident && !showUpdateModal && <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Incident History - {selectedIncident.id}
          </h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {selectedIncident.updates.map((update, index) => {
            const isLast = index === selectedIncident.updates.length - 1;
            return <li key={index}>
                    <div className="relative pb-8">
                      {!isLast && <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-blue-100">
                            <ClockIcon className="h-5 w-5 text-blue-500" aria-hidden="true" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Status changed to{' '}
                              <span className="font-medium text-gray-900">
                                {update.status}
                              </span>
                              {update.notes && <span className="ml-2 font-normal text-gray-500">
                                  — {update.notes}
                                </span>}
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <div>{formatDate(update.timestamp)}</div>
                            <div className="text-xs">by {update.updatedBy}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>;
          })}
            </ul>
          </div>
        </div>}
    </div>;
};
export default IncidentManagement;