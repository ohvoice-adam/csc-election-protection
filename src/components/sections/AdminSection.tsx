import React from 'react';
import { ClipboardListIcon, UserPlusIcon, AlertTriangleIcon, BarChart2Icon } from 'lucide-react';
const AdminSection: React.FC = () => {
  return <section id="admin" className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin</h2>
      <p className="text-gray-600 mb-6">
        Manage users, review reports, and access administrative tools.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="flex items-center">
            <ClipboardListIcon className="h-8 w-8 text-blue-600" aria-hidden="true" />
            <h3 className="ml-3 text-lg font-medium text-gray-900">
              Incident Reports
            </h3>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Review and manage submitted incident reports.
          </p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm font-medium text-blue-600">
              View Reports
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              12 new
            </span>
          </div>
        </div>
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="flex items-center">
            <UserPlusIcon className="h-8 w-8 text-blue-600" aria-hidden="true" />
            <h3 className="ml-3 text-lg font-medium text-gray-900">
              User Management
            </h3>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Add, edit, or remove user accounts.
          </p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm font-medium text-blue-600">
              Manage Users
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              42 total
            </span>
          </div>
        </div>
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="flex items-center">
            <AlertTriangleIcon className="h-8 w-8 text-blue-600" aria-hidden="true" />
            <h3 className="ml-3 text-lg font-medium text-gray-900">
              Urgent Issues
            </h3>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            View and respond to high-priority incidents.
          </p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm font-medium text-blue-600">
              View Urgent
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              3 pending
            </span>
          </div>
        </div>
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="flex items-center">
            <BarChart2Icon className="h-8 w-8 text-blue-600" aria-hidden="true" />
            <h3 className="ml-3 text-lg font-medium text-gray-900">
              Analytics
            </h3>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            View data and statistics about incidents and responses.
          </p>
          <div className="mt-2">
            <span className="text-sm font-medium text-blue-600">
              View Analytics
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Recent Activity
        </h3>
        <ul className="divide-y divide-gray-200">
          <li className="py-3">
            <div className="flex space-x-3">
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">
                    User John D. added a new incident report
                  </h3>
                  <p className="text-sm text-gray-500">2h ago</p>
                </div>
                <p className="text-sm text-gray-500">
                  Polling location accessibility issue in District 5
                </p>
              </div>
            </div>
          </li>
          <li className="py-3">
            <div className="flex space-x-3">
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">
                    Admin Sarah M. resolved an incident
                  </h3>
                  <p className="text-sm text-gray-500">5h ago</p>
                </div>
                <p className="text-sm text-gray-500">
                  Long wait times at Central High School polling location
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>;
};
export default AdminSection;