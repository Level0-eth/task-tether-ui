import { useEffect, useState } from 'react';

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

  const getInfo = async () => {
    try {
      const token = localStorage.getItem('token');

      const data = await apiRequest(
        '/v1/user/info',
        null,
        {
          Authorization: 'Bearer ' + token,
        },
        'GET'
      );

      setUser(data.match);
    } catch {
      addToast('something went wrong', 'error');
    }
  };

  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
