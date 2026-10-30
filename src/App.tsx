import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { Layout } from './components/Layout';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { Suspense, lazy } from 'react';

// Code-split route components to avoid loading heavy 3D, charting, and PDF dependencies on initial load
const CustomerDashboard = lazy(() =>
  import('./pages/customer/CustomerDashboard').then((m) => ({ default: m.CustomerDashboard }))
);
const AdminDashboard = lazy(() =>
  import('./pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
);

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-4 border-brand-pink border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function ProtectedRoute({ children, role }: { children: React.ReactNode, role: 'customer' | 'admin' }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/customer'} replace />;
  }
  
  return <>{children}</>;
}

function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={user.role === 'admin' ? '/admin' : '/customer'} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Auth Routes */}
              <Route index element={<RootRedirect />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              
              {/* Customer Routes */}
              <Route 
                path="customer/*" 
                element={
                  <ProtectedRoute role="customer">
                    <Suspense fallback={<LoadingFallback />}>
                      <CustomerDashboard />
                    </Suspense>
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin Routes */}
              <Route 
                path="admin/*" 
                element={
                  <ProtectedRoute role="admin">
                    <Suspense fallback={<LoadingFallback />}>
                      <AdminDashboard />
                    </Suspense>
                  </ProtectedRoute>
                } 
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </AuthProvider>
  );
}
