import React, { useContext } from 'react';
import { logout } from '../utils/api';
import { AuthContext } from '../utils/context';

const Navbar = () => {
  const {user} = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
     window.location.href = '/';
 };


  return (
    <div className='w-full flex h-[60px] flex items-center justify-center font-figtree bg-black text-white  font-semibold text-[16px]'>
      <ul className='flex flex-row items-center justify-around w-1/3'>
        <a href="/"><li>Dashboard</li></a>
        <a href="/audiences"><li>Audiences</li></a>
        <a href="/campaigns"><li>Campaigns</li></a>
        {user && <li onClick={handleLogout}>Logout</li>}
      </ul>
    </div>
  );
};

export default Navbar;
