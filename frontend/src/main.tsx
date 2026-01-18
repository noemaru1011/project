import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { PasswordUpdateProvider } from '@/contexts/passwordUpdateProvider.tsx';
import { AuthProvider } from '@/contexts/authProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <PasswordUpdateProvider>
        <App />
      </PasswordUpdateProvider>
    </AuthProvider>
  </StrictMode>,
);
