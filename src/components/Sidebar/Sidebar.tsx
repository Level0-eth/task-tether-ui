import { useEffect, useState } from 'react';

import Dropdown from '../ui/Dropdown/Dropdown';
import apiRequest from '../../utils/apiRequest';
import { useToaster } from '../../hooks/useToaster';
import CreateListPopup from '../Popups/CreateListPopup';

import './sidebar.css';

interface List {
  _id: string;
  list_name: string;
  selected: boolean;
}

const Sidebar = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [isOpened, setIsOpened] = useState(false);
  const addToaster = useToaster();

  const openCreateListPopup = () => {
    setIsOpened(true);
  };

  useEffect(() => {
    const getLists = async () => {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const res = await apiRequest('/v1/list/getLists', null, headers, 'GET');

        const newList = res.data.map(
          (
            list: {
              id: string;
              list_name: string;
            },
            index: number
          ) => {
            if (index == 0) {
              return { ...list, selected: true };
            } else {
              return { ...list, selected: false };
            }
          }
        );

        setLists(newList);
      } catch {
        addToaster('Something went wrong while fecting the lists');
      }
    };
    getLists();
  }, [addToaster]);

  return (
    <div className='sidebar'>
      <p className='sm-heading'>Lists</p>
      {lists.length > 0 ? (
        <Dropdown lists={lists} setLists={setLists} />
      ) : (
        <button className='create__list' onClick={openCreateListPopup}>
          Create List
        </button>
      )}
      <CreateListPopup
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        lists={lists}
        setLists={setLists}
      />
    </div>
  );
};

export default Sidebar;
