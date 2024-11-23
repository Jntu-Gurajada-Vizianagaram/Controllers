import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
// import {useDispatch} from 'react-redux';
// import {signInSuccess} from '../redux/user/userslice'

const GoogleAuthRedirect = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();

    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      // The signed-in user info.
      
      const res = await fetch ('/api/auth/google',{
        method: "POST",
        headers:{
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email:resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL
        }),
      });
      const data  = await res.json();
      console.log(data);

      // Here you can redirect the user or update your app state
    } catch (error) {
      setError(error.message);
     alert(error.message)
     console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        type="button"
        gradientDuoTone="pinkToOrange"
        outline
        className="button-admin-login"
        onClick={handleGoogleSignIn}
        startIcon={<GoogleIcon />}
        style={{ margin: '16px 0' }}
      >
        Continue with Google
      </Button>
    </div>
  );
};

export default GoogleAuthRedirect;
