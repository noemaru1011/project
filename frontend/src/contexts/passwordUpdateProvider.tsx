import { useState, type ReactNode } from 'react';
import { PasswordUpdateContext } from './passwordUpdateContext';

const STORAGE_KEY = 'passwordUpdateRequired';

export const PasswordUpdateProvider = ({ children }: { children: ReactNode }) => {
  const [passwordUpdateRequired, setPasswordUpdateRequired] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });

  const setPasswordUpdateRequiredStable = (value: boolean) => {
    setPasswordUpdateRequired(value);

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, value.toString());
    }
  };

  return (
    <PasswordUpdateContext.Provider
      value={{
        passwordUpdateRequired,
        setPasswordUpdateRequired: setPasswordUpdateRequiredStable,
      }}
    >
      {children}
    </PasswordUpdateContext.Provider>
  );
};
