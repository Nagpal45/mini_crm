import React from 'react';
import { Button } from '@material-ui/core';

const Login = () => {
    
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login with Google
      </Button>
    </div>
  );
};

export default Login;
