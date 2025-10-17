import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboard from '../components/admin/AdminDashboard';
import IncidentManagement from '../components/admin/IncidentManagement';
import UserManagement from '../components/admin/UserManagement';
import AnalyticsPanel from '../components/admin/AnalyticsPanel';
import AdminMapView from '../components/admin/AdminMapView';
import IntegrationsPanel from '../components/admin/IntegrationsPanel';
const AdminPage: React.FC = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 flex-shrink-0">
              <AdminSidebar />
            </div>
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/incidents" element={<IncidentManagement />} />
                <Route path="/map" element={<AdminMapView />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/analytics" element={<AnalyticsPanel />} />
                <Route path="/integrations" element={<IntegrationsPanel />} />
              </Routes>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default AdminPage;