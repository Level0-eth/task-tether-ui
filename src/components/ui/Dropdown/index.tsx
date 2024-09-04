import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './dropdown.css';

interface DropdownOptions {
  _id: string;
  list_name: string;
  selected: boolean;
}

const Dropdown = ({
  lists,
  setLists,
}: {
  lists: DropdownOptions[];
  setLists: React.Dispatch<React.SetStateAction<DropdownOptions[]>>;
}) => {
  const [selectedList, setSelectedList] = useState<
    DropdownOptions | undefined
  >();
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [, setSearchParams] = useSearchParams();

  const handleListClick = (event: React.MouseEvent<HTMLElement>) => {
    const element = event.target as HTMLElement;

    if (
      element.classList.contains('item') &&
      !element.classList.contains('selected')
    ) {
      setLists((prevOptions: DropdownOptions[]) => {
        const newOptions = prevOptions.map((option) => {
          if (option.list_name == element.dataset.value) {
            return { ...option, selected: true };
          }

          return { ...option, selected: false };
        });

        return newOptions;
      });
    }
  };

  useEffect(() => {
    const handleWindowClick = (event: MouseEvent) => {
      const element = event.target as HTMLElement;

      if (element.closest('.dropdown') == null) {
        setIsDropdownActive(false);
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [isDropdownActive]);

  useEffect(() => {
    const selected = lists.find((list) => list.selected);
    if (selected) {
      setSelectedList(selected);
      const newParams = new URLSearchParams();
      newParams.set('ls', selected._id);
      setSearchParams(newParams);
    }
  }, [lists, setSearchParams]);

  return (
    <div
      className={`dropdown ${isDropdownActive ? 'active' : ''}`}
      onClick={() => setIsDropdownActive(!isDropdownActive)}
    >
      <div className='dropdown__inner'>
        <div className='selected'>{selectedList?.list_name}</div>
        <ul onClick={handleListClick}>
          {lists.map((list) => {
            return (
              <li
                key={list._id}
                data-value={list.list_name}
                className={list.selected ? 'item selected' : 'item'}
              >
                {list.list_name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
