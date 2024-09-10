import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import apiRequest from '../../utils/apiRequest';
import { useToaster } from '../../hooks/useToaster';

import './popups.css';

interface Task {
  _id: string;
  title: string;
  description: string;
  labels: string[];
}

const CreateTaskPopup = ({
  isOpened,
  setIsOpened,
}: {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [task, setTask] = useState<Task>({
    _id: '',
    title: '',
    description: '',
    labels: [],
  });
  const [loading, setLoading] = useState(false);
  const addToast = useToaster();
  const searchParams = useSearchParams();

  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const current = e.target;

    setTask((prevTask) => {
      return {
        ...prevTask,
        [current.name]: current.value,
      };
    });
  };

  const createTask = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const listId = searchParams[0].get('ls');

      const res = await apiRequest(
        '/v1/task/createTask/' + listId,
        task,
        headers
      );

      if (res.message == 'Task is added') {
        addToast('Task is created');
        setLoading(false);
        setTask({
          _id: '',
          title: '',
          description: '',
          labels: [],
        });
        setIsOpened(false);
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
          <p>Create Task</p>
          <input
            type='text'
            placeholder='Enter Title'
            className='input'
            name='title'
            value={task.title}
            onChange={handleInputs}
          />
          <input
            type='text'
            placeholder='Enter Description'
            className='input'
            name='description'
            value={task.description}
            onChange={handleInputs}
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
              onClick={createTask}
            >
              Create Task
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

export default CreateTaskPopup;
