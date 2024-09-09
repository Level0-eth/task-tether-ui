import { useEffect, useState } from 'react';

import { useLists } from '../../hooks/useLists';
import { Lists } from '../../contexts/ListContext';

import './taskboard.css';

const TaskBoard = () => {
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
      </div>
    </main>
  );
};

export default TaskBoard;
