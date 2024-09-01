import React, { useEffect, useState } from 'react';

import './dropdown.css';

interface DropdownOptions {
  _id: string;
  list_name: string;
  selected: boolean;
}

const Dropdown = ({
  values,
  openCreateListPopup,
}: {
  values: DropdownOptions[];
  openCreateListPopup: () => void;
}) => {
  const [dropdownOptions, setDropdownOptions] =
    useState<DropdownOptions[]>(values);
  const [selectedOption, setSelectedOption] = useState(dropdownOptions[0]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  console.log(values);

  const handleListClick = (event: React.MouseEvent<HTMLElement>) => {
    const element = event.target as HTMLElement;

    if (
      element.classList.contains('item') &&
      !element.classList.contains('selected')
    ) {
      setDropdownOptions((prevOptions: DropdownOptions[]) => {
        const newOptions = prevOptions.map((option) => {
          if (option.list_name == element.dataset.value) {
            setSelectedOption({ ...option });
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

  return (
    <div
      className={`dropdown ${isDropdownActive ? 'active' : ''}`}
      onClick={() => setIsDropdownActive(!isDropdownActive)}
    >
      <div className='dropdown__inner'>
        <div className='selected'>{selectedOption.list_name}</div>
        <ul onClick={handleListClick}>
          {dropdownOptions.map((option) => {
            return (
              <li
                key={option._id}
                data-value={option.list_name}
                className={option.selected ? 'item selected' : 'item'}
              >
                {option.list_name}
              </li>
            );
          })}
          <hr />
          <button className='create__list' onClick={openCreateListPopup}>
            Create List
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
