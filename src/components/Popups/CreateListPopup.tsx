import { useState } from 'react';

import apiRequest from '../../utils/apiRequest';
import { useToaster } from '../../hooks/useToaster';

import './popups.css';

interface List {
  _id: string;
  list_name: string;
  selected: boolean;
}

const CreateListPopup = ({
  isOpened,
  setIsOpened,
  setLists,
}: {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  lists: List[];
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
}) => {
  const [listName, setListName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const addToast = useToaster();

  const createList = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const res = await apiRequest(
        '/v1/list/createList',
        { title: listName },
        headers
      );

      if (res.message == 'list is created successfully') {
        setListName('');
        setIsOpened(false);
        addToast(res.message, 'success');
        setLoading(false);

        setLists((prev) => {
          if (prev.length == 0) {
            return [
              {
                _id: res.data.id,
                list_name: res.data.name,
                selected: true,
              },
            ];
          }

          return [
            ...prev,
            {
              _id: res.data.id,
              list_name: res.data.name,
              selected: false,
            },
          ];
        });
      } else {
        throw new Error('Something went wrong');
      }
    } catch {
      setLoading(false);
      addToast('something went wrong', 'error');
    }
  };

  if (isOpened) {
    return (
      <>
        <div className='popup'>
          <p>Create List</p>
          <input
            type='text'
            placeholder='Enter List Name'
            className='input'
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <div className='popup__ctas'>
            <button
              className='button popup__cta--cancel'
              onClick={() => setIsOpened(false)}
            >
              Cancel
            </button>
            <button
              className={`button popup__cta--save ${loading ? 'loading' : ''}`}
              onClick={createList}
            >
              Create List
            </button>
          </div>
        </div>
        <div
          className='popup__overlay'
          onClick={() => setIsOpened(false)}
        ></div>
      </>
    );
  }

  return <></>;
};

export default CreateListPopup;
