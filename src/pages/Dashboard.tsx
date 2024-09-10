import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TaskBoard from '../components/TaskBoard';
import apiRequest from '../utils/apiRequest';
import { useToaster } from '../hooks/useToaster';
import { ListsProvider } from '../contexts/ListContext';

interface UserInfo {
  name: string;
  chatID: string;
  photoUrl: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const addToast = useToaster();
  const navigate = useNavigate();
  const searchparams = useSearchParams();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        if (!token) {
          throw new Error('No token found');
        }

        const data = await apiRequest('/v1/user/info', null, headers, 'GET');

        if (!data || !data.match) {
          throw new Error('Invalid user data');
        }

        setUser(data.match);
      } catch {
        navigate('/login');
        addToast('something went wrong', 'error');
      }
    };
    getInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ListsProvider>
      <Header user={user} />
      <div className='main flex'>
        <Sidebar />
        {searchparams[0].get('ls') ? (
          <TaskBoard />
        ) : (
          <main
            className='flex justify-center align-center'
            style={{ width: 'calc(100% - 224px)' }}
          >
            Create a list to get started
          </main>
        )}
      </div>
    </ListsProvider>
  );
};

export default Dashboard;
