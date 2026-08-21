import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { getDashboardPath } from '../accessControl';

export default function RoleHomeRedirect() {
  const user = useAuth();
  return <Navigate to={getDashboardPath(user?.role)} replace />;
}
