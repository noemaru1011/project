import { createContext, useContext, useState, type ReactNode } from 'react';

type Props = {
  passwordUpdateRequired: boolean;
  setPasswordUpdateRequired: (value: boolean) => void;
};

const LoginContext = createContext<Props | undefined>(undefined);

export const LoginProvider = (children: ReactNode) => {
  const [passwordUpdateRequired, setPasswordUpdateRequired] = useState(false);

  return (
    <LoginContext.Provider value={{ passwordUpdateRequired, setPasswordUpdateRequired }}>
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
