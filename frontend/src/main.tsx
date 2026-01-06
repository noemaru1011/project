import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { PasswordUpdateProvider } from '@/contexts/passwordUpdateProvider.tsx';
import { AuthProvider } from '@/contexts/authProvider.tsx';
import { Provider } from 'react-redux';
import { store } from '@/stores/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <PasswordUpdateProvider>
          <App />
        </PasswordUpdateProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
);
