import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white p-6">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-7xl font-extrabold text-indigo-500 tracking-wider">404</h1>
        <h2 className="text-2xl font-semibold text-slate-200">Page Not Found</h2>
        <p className="text-slate-400">
          The algorithm couldn't find the resource you were scanning for.
        </p>
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-medium transition-all shadow-lg shadow-indigo-600/20"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
