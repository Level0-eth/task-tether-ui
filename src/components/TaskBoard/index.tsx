import { useState } from 'react';
import PlusIcon from '../../assets/add.svg';
import CreateTaskPopup from '../Popups/CreateTaskPopup';

import './taskboard.css';

const TaskBoard = () => {
  const [isCreateTaskOpened, setIsCreateTaskOpened] = useState(false);

  return (
    <main className='taskboard'>
      <div className='flex justify-end'>
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
