import { createContext, useContext, useState } from 'react';

type LoginContextType = {
  passwordUpdateRequired: boolean;
  setPasswordUpdateRequired: (value: boolean) => void;
};

const LoginContext = createContext<LoginContextType>({
  passwordUpdateRequired: false,
  setPasswordUpdateRequired: () => {},
});

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [passwordUpdateRequired, setPasswordUpdateRequired] = useState(false);

  return (
    <LoginContext.Provider value={{ passwordUpdateRequired, setPasswordUpdateRequired }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);
