import { createContext, useContext, useState, type ReactNode } from 'react';

type LoginContextProps = {
  passwordUpdateRequired: boolean;
  setPasswordUpdateRequired: (value: boolean) => void;
};

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

// localStorage に保存するキー
const STORAGE_KEY = 'passwordUpdateRequired';

export const PasswordUpdateProvider = ({ children }: { children: ReactNode }) => {
  // 初期値は localStorage から取得
  const [passwordUpdateRequired, setPasswordUpdateRequired] = useState(() => {
    if (typeof window === 'undefined') return false; // SSR 対応
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });

  // 値が変わったら localStorage にも反映
  const setPasswordUpdateRequiredStable = (value: boolean) => {
    setPasswordUpdateRequired(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, value.toString());
    }
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

// フックで安全に取得
export const usePasswordUpdateContext = (): LoginContextProps => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('usePasswordUpdateContext must be used within a PasswordUpdateProvider');
  }
  return context;
};
