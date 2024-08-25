import React, { useEffect, useState } from 'react';

import './dropdown.css';

interface DropdownOptions {
  id: string;
  name: string;
  selected: boolean;
}

const Dropdown = ({ values }: { values: DropdownOptions[] }) => {
  const [dropdownOptions, setDropdownOptions] =
    useState<DropdownOptions[]>(values);
  const [selectedOption, setSelectedOption] = useState(dropdownOptions[1]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleListClick = (event: React.MouseEvent<HTMLElement>) => {
    const element = event.target as HTMLElement;

    if (
      element.classList.contains('item') &&
      !element.classList.contains('selected')
    ) {
      setDropdownOptions((prevOptions: DropdownOptions[]) => {
        const newOptions = prevOptions.map((option) => {
          if (option.name == element.dataset.value) {
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
        <div className='selected'>{selectedOption.name}</div>
        <ul onClick={handleListClick}>
          {dropdownOptions.map((option) => {
            return (
              <li
                key={option.id}
                data-value={option.name}
                className={option.selected ? 'item selected' : 'item'}
              >
                {option.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
