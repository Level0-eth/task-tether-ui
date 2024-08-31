import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import apiRequest from '../utils/apiRequest';
import { useToaster } from '../hooks/useToaster';

interface UserInfo {
  name: string;
  chatID: string;
  photoUrl: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const addToast = useToaster();
  const navigate = useNavigate();

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
  }, [navigate, addToast]);

  return (
    <>
      <Header user={user} />
      <div className='main flex'>
        <Sidebar />
      </div>
    </>
  );
};

export default Dashboard;
