import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl">Incident Management</h1>
        {isAuthenticated && (
          <div>
            <Link to="/profile" className="text-white mx-2">
              <FaUser /> My Profile
            </Link>
            <button onClick={logout} className="text-white mx-2">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
