import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

export interface Lists {
  _id: string;
  list_name: string;
  selected: boolean;
}

interface ListsContextType {
  lists: Lists[];
  setLists: Dispatch<SetStateAction<Lists[]>>;
}

interface ListsProviderProps {
  children: ReactNode;
}

const ListsContext = createContext<ListsContextType | undefined>(undefined);

const ListsProvider: FC<ListsProviderProps> = ({ children }) => {
  const [lists, setLists] = useState<Lists[]>([]);

  return (
    <ListsContext.Provider value={{ lists, setLists }}>
      {children}
    </ListsContext.Provider>
  );
};

export { ListsContext, ListsProvider };
