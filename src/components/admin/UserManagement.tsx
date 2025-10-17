import React from 'react';
import { UsersIcon } from 'lucide-react';
const UserManagement: React.FC = () => {
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage user accounts and permissions.
        </p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-center p-12">
          <div className="text-center">
            <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              User management functionality
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              This section is under development.
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default UserManagement;