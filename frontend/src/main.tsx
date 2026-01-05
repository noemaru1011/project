import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { PasswordUpdateProvider } from '@/contexts/passwordUpdateContext.tsx';
import { Provider } from 'react-redux';
import { store } from '@/stores/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PasswordUpdateProvider>
        <App />
      </PasswordUpdateProvider>
    </Provider>
  </StrictMode>,
);
