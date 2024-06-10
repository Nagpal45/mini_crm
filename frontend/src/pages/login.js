import React from 'react';

const Login = () => {
    
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className='flex flex-row items-center justify-center w-full h-full font-figtree'>
      <div className="flex w-2/3 overflow-hidden h-full items-center justify-center">
        <img src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGN1c3RvbWVyJTIwcmVsYXRpb25zaGlwJTIwbWFuYWdlbWVudHxlbnwwfHwwfHx8MA%3D%3D" alt="" className='h-full w-full'/>
      </div>
      <div className="flex w-full h-full items-center justify-center flex-col font-semibold">
        <h1 className='text-[75px]'>Mini CRM</h1>
        <h3 className='text-[25px]'>Your Customer Connection Hub</h3>
        <button className='bg-blue-200 w-1/2 h-[50px] rounded-[50px] text-[18px] mt-[100px]' onClick={handleLogin}>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
