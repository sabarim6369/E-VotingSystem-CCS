import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ admin = false }) {
  const token = admin ? localStorage.getItem('adminToken') : localStorage.getItem('token');

  if (!token) {
    return <Navigate to={admin ? '/admin' : '/login'} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
