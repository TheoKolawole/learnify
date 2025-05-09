import { Routes, Route } from 'react-router-dom';
import AccountLayout from '../Layouts/AccountLayout';
import ProfilePage from '@/pages/ProfilePage';
import SettingsPage from '@/pages/SettingsPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import Dashboard from '@/pages/DashboardPage';
import StudentRoutes from './StudentRoutes';
import InstructorRoutes from './InstructorRoutes';

const AccountRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AccountLayout />}>
        <Route index element={<Dashboard />} />

        {/* Nest student and instructor routes */}
        <Route path="student/*" element={<StudentRoutes />} />
        <Route path="instructor/*" element={<InstructorRoutes />} />

        {/* General account routes */}
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>
    </Routes>
  );
};

export default AccountRoutes;
