import { useEffect, useState } from 'react';

import CreateTaskPopup from '../Popups/CreateTaskPopup';
import { useLists } from '../../hooks/useLists';
import { Lists } from '../../contexts/ListContext';

import PlusIcon from '../../assets/add.svg';

import './taskboard.css';

const TaskBoard = () => {
  const [isCreateTaskOpened, setIsCreateTaskOpened] = useState(false);
  const [selectList, setSelectedList] = useState<Lists>();
  const { lists } = useLists();

  useEffect(() => {
    const selected = lists.find((list) => list.selected);
    setSelectedList(selected);
  }, [lists]);

  return (
    <main className='taskboard'>
      <div className='flex justify-between align-center'>
        <p>{selectList?.list_name}</p>
        <button
          className='addtask__btn'
          onClick={() => setIsCreateTaskOpened(true)}
        >
          Create Task <img src={PlusIcon} alt='' />
        </button>
        <CreateTaskPopup
          isOpened={isCreateTaskOpened}
          setIsOpened={setIsCreateTaskOpened}
        />
      </div>
    </main>
  );
};

export default TaskBoard;
