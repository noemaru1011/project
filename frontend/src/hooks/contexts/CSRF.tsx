import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface CsrfContextValue {
  csrfToken: string | null;
  setCsrfToken: (token: string) => void;
}

const CsrfContext = createContext<CsrfContextValue | undefined>(undefined);

export const CsrfProvider = ({ children }: { children: ReactNode }) => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    console.log("csrfToken changed:", csrfToken);
  }, [csrfToken]);

  return (
    <CsrfContext.Provider value={{ csrfToken, setCsrfToken }}>
      {children}
    </CsrfContext.Provider>
  );
};

export const useCsrf = () => {
  const context = useContext(CsrfContext);
  if (!context) {
    throw new Error("useCsrf must be used within a CsrfProvider");
  }
  return context;
};
