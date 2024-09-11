// src/components/NavBar.jsx

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Incident Manager</div>
      <div className="space-x-4">
        <Link to="/profile" className="flex items-center">
          <FaUser className="mr-2" /> My Profile
        </Link>
        <button onClick={handleLogout} className="flex items-center">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
