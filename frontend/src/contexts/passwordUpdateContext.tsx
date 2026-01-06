import { createContext, useContext } from 'react';

export type PasswordUpdateContextType = {
  passwordUpdateRequired: boolean;
  setPasswordUpdateRequired: (value: boolean) => void;
};

export const PasswordUpdateContext = createContext<PasswordUpdateContextType | undefined>(
  undefined,
);

export const usePasswordUpdateContext = (): PasswordUpdateContextType => {
  const context = useContext(PasswordUpdateContext);
  if (!context) {
    throw new Error('usePasswordUpdateContext must be used within a PasswordUpdateProvider');
  }
  return context;
};
