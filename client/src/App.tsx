import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import PortfolioPublic from './pages/public/PortfolioPublic';

// Dashboard Pages
import MainDashboard from './pages/dashboard/MainDashboard';
import DailyReport from './pages/dashboard/DailyReport';
import Calendar from './pages/dashboard/Calendar';
import Notes from './pages/dashboard/Notes';

// Spiritual Pages
import SpiritualDashboard from './pages/spiritual/SpiritualDashboard';
import PrayerTracker from './pages/spiritual/PrayerTracker';
import DhikrTracker from './pages/spiritual/DhikrTracker';
import QuranTracker from './pages/spiritual/QuranTracker';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import SystemSettings from './pages/admin/SystemSettings';
import AuditLogs from './pages/admin/AuditLogs';

// Settings Pages
import UserSettings from './pages/settings/UserSettings';
import NotificationSettings from './pages/settings/NotificationSettings';
import AppearanceSettings from './pages/settings/AppearanceSettings';
import PortfolioSettings from './pages/settings/PortfolioSettings';

// Portfolio Pages
import MyPortfolio from './pages/portfolio/MyPortfolio';
import PortfolioEditor from './pages/portfolio/PortfolioEditor';

function App() {
  const { initialize } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/portfolio/:username" element={<PortfolioPublic />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainDashboard />
              </ProtectedRoute>
            } />
            <Route path="/daily-report" element={
              <ProtectedRoute>
                <DailyReport />
              </ProtectedRoute>
            } />
            <Route path="/calendar" element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            } />
            <Route path="/notes" element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            } />

            {/* Spiritual Routes */}
            <Route path="/spiritual" element={
              <ProtectedRoute>
                <SpiritualDashboard />
              </ProtectedRoute>
            } />
            <Route path="/spiritual/prayer" element={
              <ProtectedRoute>
                <PrayerTracker />
              </ProtectedRoute>
            } />
            <Route path="/spiritual/dhikr" element={
              <ProtectedRoute>
                <DhikrTracker />
              </ProtectedRoute>
            } />
            <Route path="/spiritual/quran" element={
              <ProtectedRoute>
                <QuranTracker />
              </ProtectedRoute>
            } />

            {/* Portfolio Routes */}
            <Route path="/my-portfolio" element={
              <ProtectedRoute>
                <MyPortfolio />
              </ProtectedRoute>
            } />
            <Route path="/portfolio-editor" element={
              <ProtectedRoute>
                <PortfolioEditor />
              </ProtectedRoute>
            } />

            {/* Settings Routes */}
            <Route path="/settings" element={
              <ProtectedRoute>
                <UserSettings />
              </ProtectedRoute>
            } />
            <Route path="/settings/notifications" element={
              <ProtectedRoute>
                <NotificationSettings />
              </ProtectedRoute>
            } />
            <Route path="/settings/appearance" element={
              <ProtectedRoute>
                <AppearanceSettings />
              </ProtectedRoute>
            } />
            <Route path="/settings/portfolio" element={
              <ProtectedRoute>
                <PortfolioSettings />
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute adminOnly>
                <UserManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute adminOnly>
                <SystemSettings />
              </ProtectedRoute>
            } />
            <Route path="/admin/logs" element={
              <ProtectedRoute adminOnly>
                <AuditLogs />
              </ProtectedRoute>
            } />

            {/* 404 Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
