import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useToaster } from '../hooks/useToaster';
import apiRequest from '../utils/apiRequest';
import Button from '../components/ui/Button/Button';

import './loginpage.css';

import Logo from '../assets/logo.svg';

interface LoginData {
  userName: string;
  password: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginData>({
    userName: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const addToast = useToaster();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    setFormData({
      ...formData,
      [target.name]: target.value.trim(),
    });
  };

  const login = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (formData.userName.trim().length <= 5) {
      addToast('User name must be more than 5 digits', 'error');
      return;
    } else if (formData.password == '') {
      addToast('plase enter a password', 'error');
      return;
    } else if (formData.password.length < 8) {
      addToast('password should be more than 8 digits', 'error');
      return;
    }

    setLoading(true);

    const requestObj = {
      userId: formData.userName,
      password: formData.password,
    };

    try {
      const data = await apiRequest(
        'http://localhost:8080/v1/user/login',
        requestObj
      );

      localStorage.setItem('token', data.token);
      addToast('Welcome Boss!!', 'success');
      setLoading(false);
      navigate('/');
    } catch {
      setLoading(false);
      addToast('Something Went Wrong!!', 'error');
    }
  };

  return (
    <div className='join'>
      <div className='logo bg__lines'>
        <div className='logo__inner'>
          <img src={Logo} alt='' />
        </div>
      </div>
      <div className='auth'>
        <div className='auth__innner'>
          <h2>Login</h2>
          <div className='flex column'>
            <form>
              <div className='input__wrapper'>
                <input
                  className='input'
                  type='text'
                  placeholder='Enter User Name'
                  name='userName'
                  value={formData.userName}
                  onChange={handleInputChange}
                />
              </div>
              <div className='input__wrapper'>
                <input
                  className='input'
                  type='password'
                  placeholder='Enter Password'
                  name='password'
                  autoComplete='true'
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <Button value='Login' clickEvent={login} loading={loading} />
              <p className='note'>
                Don't have an account? <Link to='/signup'>Signup</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
