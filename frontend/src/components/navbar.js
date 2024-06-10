import React, { useContext } from 'react';
import { logout } from '../utils/api';
import { AuthContext } from '../utils/context';

const Navbar = () => {
  const {user} = useContext(AuthContext);
  const username = user ? user.name : '';

  const handleLogout = async () => {
    await logout();
     window.location.href = '/';
 };


  return (
    <div className='w-full flex h-[60px] flex items-center justify-between font-figtree bg-black text-white  font-semibold text-[16px]'>
      <ul className='flex flex-row items-center justify-around w-[400px] ml-[20px]'>
        <a href="/"><li>Dashboard</li></a>
        <a href="/audiences"><li>Audiences</li></a>
        <a href="/campaigns"><li>Campaigns</li></a>
      </ul>
      {
        user ? (
        <div className='flex flex-row justify-center items-center mr-[40px] gap-[40px] h-full'>
          <p className='bg-[#1a1a1a] h-full flex items-center px-6'>Welcome, {username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
        ) : (
          null
        )
      }
    </div>
  );
};

export default Navbar;
