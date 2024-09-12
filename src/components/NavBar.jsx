import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  if (location.pathname === '/login') {
    return null;
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl">Incident Management</h1>
        {user && (
          <div className="flex items-center">
            <Link to="/profile" className="text-white mx-2 flex items-center">
              <FaUser className="mr-1" /> My Profile
            </Link>
            <button onClick={logout} className="text-white mx-2 flex items-center">
              <FaSignOutAlt className="mr-1" /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
