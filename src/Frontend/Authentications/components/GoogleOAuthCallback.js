import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleOAuthCallback = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    const params = new URLSearchParams(hash.replace('#', ''));
    const token = params.get('access_token');

    if (token) {
      // Handle the token (e.g., save it to local storage, send it to the backend, etc.)
      console.log('Access Token:', token);
    }
  }, [location]);

};

export default GoogleOAuthCallback;
