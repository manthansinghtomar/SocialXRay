import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import router from './routes/router';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#cbd5e1',
            border: '1px solid #334155',
            borderRadius: '8px',
            fontSize: '14px',
          },
        }}
      />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;