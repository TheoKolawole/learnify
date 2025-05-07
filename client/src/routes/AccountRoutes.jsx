import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import AccountLayout from '../Layouts/AccountLayout';
import ProfilePage from '@/pages/ProfilePage';
import SettingsPage from '@/pages/SettingsPage';
import AnalyticsPage from '@/pages/AnalyticsPage';


const AccountRoutes = () => {

  return (
    <Routes>
      <Route element={<AccountLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Route>
    </Routes>
  );
};

export default AccountRoutes;
