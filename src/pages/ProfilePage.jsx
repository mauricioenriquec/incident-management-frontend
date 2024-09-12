import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaSave } from 'react-icons/fa';

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    name: user?.name || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert('Profile updated!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded flex items-center">
          <FaSave className="mr-2" /> Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
