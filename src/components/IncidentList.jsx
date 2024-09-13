import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import dayjs from 'dayjs';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext'; // Importamos el contexto

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [modalType, setModalType] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const { user } = useContext(AuthContext); // Obtenemos el usuario del contexto

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/incidents', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Role': user.role,
          },
        });
        setIncidents(response.data);
      } catch (err) {
        setError('Error al cargar las incidencias. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, [user.role]);

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const handleUpdateStatus = async (incidentId, newStatus) => {
    try {
      await api.put(`/incidents/${incidentId}`, { status: newStatus });
      setIncidents(incidents.map((incident) =>
        incident.id === incidentId ? { ...incident, status: newStatus } : incident
      ));
      setShowModal(false);
      showNotificationMessage('Incidencia actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar la incidencia:', error);
    }
  };

  const handleDeleteIncident = async (incidentId) => {
    try {
      await api.delete(`/incidents/${incidentId}`);
      setIncidents(incidents.filter((incident) => incident.id !== incidentId));
      setShowModal(false);
      showNotificationMessage('Incidencia eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar la incidencia:', error);
    }
  };

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const filteredIncidents = incidents.filter(
    (incident) => filter === 'all' || incident.status === filter
  );

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  if (loading) {
    return <p>Cargando incidencias...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <div className="flex justify-center mb-4">
        <select
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">Todos</option>
          <option value="Open">Open</option>
          <option value="Submitted">Submitted</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIncidents.length > 0 ? (
          filteredIncidents.map((incident) => (
            <div
              key={incident.id}
              className={`bg-white p-4 rounded shadow relative text-left ${
                user.role !== 'admin' ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              onClick={() => {
                if (user.role === 'admin') {
                  setSelectedIncident(incident);
                  setShowModal(true);
                  setModalType('options');
                }
              }}
            >
              <h3 className="text-xl font-bold">{incident.title}</h3>
              <p>{incident.description}</p>
              <p className="text-sm text-gray-500">Estado: {incident.status}</p>
              <p className="text-sm text-gray-500">Ubicación: {incident.location}</p>
              <p className="text-sm text-gray-500">
                Fecha: {dayjs(incident.created_at).format('DD/MM/YYYY HH:mm')}
              </p>
            </div>
          ))
        ) : (
          <p>No hay incidencias reportadas.</p>
        )}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {modalType === 'options' && (
              <>
                <button
                  onClick={() => setModalType('update')}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  <FaEdit className="mr-1" /> Actualizar
                </button>
                <button
                  onClick={() => setModalType('delete')}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  <FaTrash className="mr-1" /> Eliminar
                </button>
              </>
            )}
            {modalType === 'update' && (
              <>
                <p>Actualizar estado de la incidencia:</p>
                <button
                  onClick={() => handleUpdateStatus(selectedIncident.id, 'Open')}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Open
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedIncident.id, 'Closed')}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Closed
                </button>
              </>
            )}
            {modalType === 'delete' && (
              <>
                <p>Confirmar Acción:</p>
                <p>¿Eliminar?</p>
                <button
                  onClick={() => handleDeleteIncident(selectedIncident.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                >
                  SI
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  NO
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg">
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default IncidentList;
