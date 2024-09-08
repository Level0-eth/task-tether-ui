import { useContext } from 'react';

import { ListsContext } from '../contexts/ListContext';

export const useLists = () => {
  const context = useContext(ListsContext);

  if (context === undefined) {
    throw new Error('useLists must be used within a ListProvider');
  }
  return context;
};
