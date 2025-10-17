import React from 'react';
import IncidentStatusTracker from '../IncidentStatusTracker';
import { AlertTriangleIcon, CheckCircleIcon, ClockIcon, XCircleIcon, BarChart2Icon, MapPinIcon, UsersIcon } from 'lucide-react';
const AdminDashboard: React.FC = () => {
  // Sample stats data
  const stats = [{
    label: 'Total Incidents',
    value: 32,
    icon: AlertTriangleIcon,
    color: 'bg-yellow-100 text-yellow-800',
    iconColor: 'text-yellow-500'
  }, {
    label: 'Resolved',
    value: 18,
    icon: CheckCircleIcon,
    color: 'bg-green-100 text-green-800',
    iconColor: 'text-green-500'
  }, {
    label: 'In Progress',
    value: 7,
    icon: ClockIcon,
    color: 'bg-blue-100 text-blue-800',
    iconColor: 'text-blue-500'
  }, {
    label: 'Critical Priority',
    value: 4,
    icon: AlertTriangleIcon,
    color: 'bg-red-100 text-red-800',
    iconColor: 'text-red-500'
  }];
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of incident reports, status changes, and polling location
          issues.
        </p>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
        const Icon = stat.icon;
        return <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md p-3 ${stat.color.split(' ')[0]}`}>
                    <Icon className={`h-6 w-6 ${stat.iconColor}`} aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.label}
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {stat.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>;
      })}
      </div>
      {/* Incident Status Tracker */}
      <IncidentStatusTracker />
      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Activity
          </h3>
          <div className="mt-4 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Action
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          User
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Incident #INC-005 status updated to "Investigating"
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          Admin Sarah
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          5 minutes ago
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          New incident reported at Fairfax High School
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          John Doe
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          15 minutes ago
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Incident #INC-003 marked as "Verified"
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          Admin Mike
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          30 minutes ago
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Priority changed to "Critical" for incident #INC-002
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          Admin Sarah
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          45 minutes ago
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default AdminDashboard;