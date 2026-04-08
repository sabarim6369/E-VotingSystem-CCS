import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ConfirmationPage from './pages/ConfirmationPage';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VotePage from './pages/VotePage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminResultsPage from './pages/admin/AdminResultsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={<AdminLoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/vote/:electionId" element={<VotePage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Route>

      <Route element={<ProtectedRoute admin />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/results/:electionId" element={<AdminResultsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
