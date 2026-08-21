import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { canAccessPage } from '../accessControl';

export default function AuthorizedRoute({ page, children }) {
  const user = useAuth();

  if (!user || !canAccessPage(user.role, page)) {
    return <Navigate to="/restrictedaccess" replace />;
  }

  return children;
}
