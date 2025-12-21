import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { LoginProvider } from '@/hooks/passwordUpdateContext';
import { Provider } from 'react-redux';
import { store } from '@/hooks/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <LoginProvider>
        <App />
      </LoginProvider>
    </Provider>
  </StrictMode>,
);
