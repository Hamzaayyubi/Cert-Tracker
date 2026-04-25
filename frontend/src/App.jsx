import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CertificationForm from './pages/CertificationForm';
import CertificationDetail from './pages/CertificationDetail';
import SharedCertification from './pages/SharedCertification';
import LandingPage from './pages/LandingPage';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
  if (!user) return <Navigate to="/login" />;
  return children;
};

const NotFound = () => (
  <div className="p-8 text-center flex flex-col items-center justify-center h-[60vh]">
    <h1 className="text-6xl font-bold text-primary">404</h1>
    <p className="text-2xl mt-4 text-gray-700 dark:text-text-secondary">Page Not Found</p>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex flex-col font-sans transition-colors">
            {/* Conditional Navbar rendering - hide on landing page since it has its own */}
            <Routes>
              <Route path="/share/:shareId" element={null} />
              <Route path="/" element={null} />
              <Route path="*" element={<Navbar />} />
            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  borderRadius: '12px',
                  fontSize: '14px',
                },
              }}
            />
            <main className="flex-1 w-full">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/certifications/new" element={<ProtectedRoute><CertificationForm /></ProtectedRoute>} />
                <Route path="/certifications/:id/edit" element={<ProtectedRoute><CertificationForm /></ProtectedRoute>} />
                <Route path="/certifications/:id" element={<ProtectedRoute><CertificationDetail /></ProtectedRoute>} />
                <Route path="/share/:shareId" element={<SharedCertification />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
