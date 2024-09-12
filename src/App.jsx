import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import IncidentForm from './components/IncidentForm';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute/>}>
        <Route 
          path="/" 
          element={<DashboardPage />} 
        />
        <Route 
          path="/profile" 
          element={<ProfilePage />} 
        />
        <Route 
          path="/report" 
          element={<IncidentForm />} 
        />
        </Route>
      </Routes>
    </>
  );
}

export default App;
