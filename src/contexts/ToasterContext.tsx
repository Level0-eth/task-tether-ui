import React, { createContext, useCallback, useState } from 'react';

interface ToasterProviderProps {
  children: React.ReactNode;
}

interface ToastsProos {
  id: number;
  message: string;
  type: string;
}

type ToasterContextType = (message: string, type?: string) => void;

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

const ToasterProvider = ({ children }: ToasterProviderProps) => {
  const [toasts, setToasts] = useState<ToastsProos[] | []>([]);

  const addToast: ToasterContextType = useCallback(
    (message: string, type = 'info') => {
      const id = new Date().getTime();
      setToasts([...toasts, { id, message, type }]);

      setTimeout(() => {
        setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
      }, 3000);
    },
    [toasts]
  );

  return (
    <ToasterContext.Provider value={addToast}>
      {children}
      <div className='toaster'>
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToasterContext.Provider>
  );
};

export default ToasterProvider;
export { ToasterContext };
