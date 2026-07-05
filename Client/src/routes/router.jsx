import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Route guards
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// Layout shell
import { Layout } from '../components/layout';

// Loading fallback component
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-slate-400">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-800 border-t-indigo-500" />
      <span className="text-xs font-medium tracking-wide">Loading component...</span>
    </div>
  </div>
);

// Helper for lazy loading pages with Suspense boundaries
const lazyLoad = (importFunc) => {
  const LazyComponent = lazy(importFunc);
  return (
    <Suspense fallback={<PageLoader />}>
      <LazyComponent />
    </Suspense>
  );
};

// Lazy loaded page components
const LandingPage = () => lazyLoad(() => import('../pages/Landing/LandingPage'));
const LoginPage = () => lazyLoad(() => import('../pages/Auth/LoginPage'));
const RegisterPage = () => lazyLoad(() => import('../pages/Auth/RegisterPage'));
const DashboardPage = () => lazyLoad(() => import('../pages/Dashboard/DashboardPage'));
const AnalyzePage = () => lazyLoad(() => import('../pages/Analyze/AnalyzePage'));
const HistoryPage = () => lazyLoad(() => import('../pages/History/HistoryPage'));
const ProfilePage = () => lazyLoad(() => import('../pages/Profile/ProfilePage'));
const NotFoundPage = () => lazyLoad(() => import('../pages/NotFound/NotFoundPage'));

export const router = createBrowserRouter([
  // Public-only pages (redirects to dashboard if logged in)
  {
    path: '/',
    element: (
      <PublicRoute>
        <LandingPage />
      </PublicRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  // Protected pages wrapped in Layout shell
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/analyze',
        element: <AnalyzePage />,
      },
      {
        path: '/history',
        element: <HistoryPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },
  // Catch-all 404 route
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
