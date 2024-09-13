import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { FiEdit, FiTrash2, FiUserPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

const UsersManagerPage = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: '', password: '' });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error.response ? error.response.data.message : error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = (user = null) => {
    setSelectedUser(user);
    if (user) {
      setFormData({ name: user.name, email: user.email, role: user.role });
    } else {
      setFormData({ name: '', email: '', role: '', password: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const handleSave = async () => {
    try {
      if (selectedUser) {
        await api.patch(`/users/${selectedUser.id}`, formData);
        showNotificationMessage('Usuario actualizado exitosamente');
      } else {
        await api.post('/users/register', formData);
        showNotificationMessage('Usuario creado exitosamente');
      }
      fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Error saving user:', error.response ? error.response.data.message : error.message);
      showNotificationMessage('Error al guardar usuario');
    }
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/users/${selectedUser.id}`);
      showNotificationMessage('Usuario eliminado exitosamente');
      fetchUsers();
      closeDeleteModal();
    } catch (error) {
      console.error('Failed to delete user:', error.response ? error.response.data.message : error.message);
      showNotificationMessage('Error al eliminar usuario');
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        {user?.role === 'admin' && (
          <button
            onClick={() => openModal()}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded inline-flex items-center"
          >
            <FiUserPlus className="mr-2" /> Nuevo Usuario
          </button>
        )}
      </div>

      <table className="table-auto w-full bg-white shadow-md rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Rol</th>
            <th className="px-4 py-2">Contraseña</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="px-4 py-2">{u.name}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">{u.role}</td>
              <td className="px-4 py-2">********</td>
              <td className="px-4 py-2 flex space-x-2">
                {user?.role === 'admin' && (
                  <>
                    <button
                      onClick={() => openModal(u)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => openDeleteModal(u)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-1/3">
            <h2 className="text-xl font-bold mb-4">{selectedUser ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Rol</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="">Selecciona un rol</option>
                  <option value="admin">Admin</option>
                  <option value="resident">Resident</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  {selectedUser ? 'Actualizar' : 'Crear'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={closeDeleteModal}></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-1/3">
            <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar a {selectedUser?.name}?</p>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
              <button
                type="button"
                onClick={closeDeleteModal}
                className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg">
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default UsersManagerPage;
