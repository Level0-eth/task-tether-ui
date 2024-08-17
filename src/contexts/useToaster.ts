import { createContext, useContext } from 'react';
import { ToasterContextType } from './ToasterContext';

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const useToaster = () => {
  const context = useContext(ToasterContext);

  if (context === undefined) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};
