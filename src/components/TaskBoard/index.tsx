import { useEffect, useState } from 'react';

import { useLists } from '../../hooks/useLists';
import { Lists } from '../../contexts/ListContext';
import apiRequest from '../../utils/apiRequest';

import './taskboard.css';

interface Task {
  title: string;
  description: string;
  labels: string[];
}

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[] | []>([]);
  const [selectedList, setSelectedList] = useState<Lists>();
  const { lists } = useLists();

  useEffect(() => {
    const selected = lists.find((list) => list.selected);
    setSelectedList(selected);
  }, [lists]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        if (!token) {
          throw new Error('No token found');
        }

        const res = await apiRequest(
          '/v1/task/getTask/' + selectedList?._id,
          null,
          headers
        );
        console.log(res);
        setTasks(res.data);
      } catch {
        console.log('error');
      }
    };

    getTasks();
  }, [selectedList]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <main className='taskboard'>
      <div className='flex justify-between align-center'>
        <p>{selectedList?.list_name}</p>
      </div>
    </main>
  );
};

export default TaskBoard;
