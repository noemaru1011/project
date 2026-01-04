import { createContext, useContext, useState, type ReactNode } from 'react';

type Props = {
  passwordUpdateRequired: boolean;
  setPasswordUpdateRequired: (value: boolean) => void;
};

const LoginContext = createContext<Props | undefined>(undefined);
let passwordUpdateRequiredCache = false;

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [passwordUpdateRequired, setPasswordUpdateRequired] = useState(passwordUpdateRequiredCache);

  const setPasswordUpdateRequiredStable = (value: boolean) => {
    passwordUpdateRequiredCache = value;
    setPasswordUpdateRequired(value);
  };

  return (
    <LoginContext.Provider
      value={{
        passwordUpdateRequired,
        setPasswordUpdateRequired: setPasswordUpdateRequiredStable,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = (): Props => {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }

  return context;
};
