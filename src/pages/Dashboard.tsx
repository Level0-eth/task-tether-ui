import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/Header';

interface UserInfo {
  name: string;
  chatID: string;
  photoUrl: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + token);

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://localhost:8080/v1/user/info', requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Token is invalid');
        }
        return res.json();
      })
      .then((result) => {
        setUser(result.match);
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

  return (
    <>
      <Header user={user} />
    </>
  );
};

export default Dashboard;
