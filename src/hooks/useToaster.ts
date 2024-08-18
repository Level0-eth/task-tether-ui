import { useContext } from 'react';

import { ToasterContext } from '../contexts/ToasterContext';

export const useToaster = () => {
  const context = useContext(ToasterContext);

  if (context === undefined) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};
