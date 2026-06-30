import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';
import APIs from '../../Main/apis_data/APIs';
import { AuthProvider } from '../AuthContext';

const getStoredUser = () => {
  try {
    const stored = JSON.parse(localStorage.getItem('accesser'));
    if (!stored?.islogin) return null;
    return {
      role: stored.role,
      name: stored.admin || stored.name,
      email: stored.email || stored.username,
    };
  } catch {
    localStorage.removeItem('accesser');
    return null;
  }
};

export default function ProtectedRoute() {
  const [user, setUser] = useState(getStoredUser);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    let active = true;
    axios.get(APIs.admin_apis.session)
      .then((response) => {
        const user = response.data.user;
        localStorage.setItem('accesser', JSON.stringify({
          islogin: true,
          role: user.role,
          admin: user.name,
          email: user.email,
        }));
        if (active) {
          setUser(user);
          setSessionChecked(true);
        }
      })
      .catch(() => {
        localStorage.removeItem('accesser');
        if (active) {
          setUser(null);
          setSessionChecked(true);
        }
      });
    return () => { active = false; };
  }, []);

  if (!user && !sessionChecked) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <AuthProvider value={user}><Outlet /></AuthProvider>;
}
