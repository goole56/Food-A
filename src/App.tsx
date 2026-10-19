import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { Layout } from './components/Layout';

// Lazy loading route components to reduce initial bundle size and speed up initial page load
const Login = lazy(() => import('./pages/auth/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('./pages/auth/Register').then(m => ({ default: m.Register })));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword').then(m => ({ default: m.ForgotPassword })));
const CustomerDashboard = lazy(() => import('./pages/customer/CustomerDashboard').then(m => ({ default: m.CustomerDashboard })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

const PageLoading = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-brand-pink border-t-transparent rounded-full animate-spin" />
  </div>
);

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
              <Route path="login" element={<Suspense fallback={<PageLoading />}><Login /></Suspense>} />
              <Route path="register" element={<Suspense fallback={<PageLoading />}><Register /></Suspense>} />
              <Route path="forgot-password" element={<Suspense fallback={<PageLoading />}><ForgotPassword /></Suspense>} />
              
              {/* Customer Routes */}
              <Route 
                path="customer/*" 
                element={
                  <ProtectedRoute role="customer">
                    <Suspense fallback={<PageLoading />}>
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
                    <Suspense fallback={<PageLoading />}>
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
