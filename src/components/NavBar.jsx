import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaSignOutAlt, FaUser, FaHome, FaTachometerAlt } from 'react-icons/fa';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  if (location.pathname === '/login') {
    return null;
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl">
          <FaHome className="mr-1" /> Incident Management
        </Link>
        {user && (
          <div className="flex items-center">
            <Link to="/" className="text-white mx-2 flex items-center">
              <FaTachometerAlt className="mr-1" /> Dashboard
            </Link>
            {user.role === 'admin' && (
              <Link to="/users" className="text-white mx-2 flex items-center">
                <FaUser className="mr-1" /> Users Manager
              </Link>
            )}
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
