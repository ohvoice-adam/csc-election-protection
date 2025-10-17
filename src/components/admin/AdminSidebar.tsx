import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboardIcon, AlertTriangleIcon, UsersIcon, BarChart2Icon, SettingsIcon, MapPinIcon, LinkIcon } from 'lucide-react';
const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === `/admin${path}`;
  };
  const navItems = [{
    path: '',
    label: 'Dashboard',
    icon: LayoutDashboardIcon
  }, {
    path: '/incidents',
    label: 'Incident Management',
    icon: AlertTriangleIcon
  }, {
    path: '/map',
    label: 'Polling Places Map',
    icon: MapPinIcon
  }, {
    path: '/users',
    label: 'User Management',
    icon: UsersIcon
  }, {
    path: '/analytics',
    label: 'Analytics',
    icon: BarChart2Icon
  }, {
    path: '/integrations',
    label: 'Integrations',
    icon: LinkIcon
  }, {
    path: '/settings',
    label: 'Settings',
    icon: SettingsIcon
  }];
  return <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Admin Panel</h2>
        <nav className="space-y-1">
          {navItems.map(item => {
          const Icon = item.icon;
          return <Link key={item.path} to={`/admin${item.path}`} className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive(item.path) ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                <Icon className={`mr-3 h-5 w-5 ${isActive(item.path) ? 'text-blue-500' : 'text-gray-400'}`} />
                {item.label}
              </Link>;
        })}
        </nav>
      </div>
    </div>;
};
export default AdminSidebar;