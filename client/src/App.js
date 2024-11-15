import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/common/Header';
import WelcomePage from './components/common/WelcomePage';
import LandingPage from './components/common/LandingPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import GiftList from './components/gifts/GiftList';
import AddGiftForm from './components/gifts/AddGiftForm';
import CreateList from './components/gifts/CreateList';
import Registry from './components/gifts/Registry';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="container">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes */}
              <Route 
                path="/createlist" 
                element={
                  <ProtectedRoute>
                    <CreateList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/user/:userId/registry/:registryId" 
                element={
                  <ProtectedRoute>
                    <Registry />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/gifts" 
                element={
                  <ProtectedRoute>
                    <GiftList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/add-gift" 
                element={
                  <ProtectedRoute>
                    <AddGiftForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/welcome" 
                element={
                  <ProtectedRoute>
                    <WelcomePage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;