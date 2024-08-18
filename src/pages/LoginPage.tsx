import { ChangeEvent, useState } from 'react';

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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    setFormData({
      ...formData,
      [target.name]: target.value.trim(),
    });
  };

  const login = () => {
    setLoading(true);
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
