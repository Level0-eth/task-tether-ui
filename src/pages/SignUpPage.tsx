import { ChangeEvent, useState } from 'react';
import { LoginButton } from '@telegram-auth/react';

import Button from '../components/ui/Button/Button';
import { useToaster } from '../contexts/useToaster';

import Logo from '../assets/logo.svg';

interface SingUpData {
  userName: string;
  password: string;
  confirmPassword: string;
}

interface telegramData {
  auth_date: number;
  first_name: string;
  hash: string;
  id: number;
  last_name: string;
  photo_url: string;
}

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

const SignUpPage = () => {
  const [formData, setFormData] = useState<SingUpData>({
    userName: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const addToast = useToaster();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.name == 'userName' && target.value.trim().length > 5) {
      const requestObj = JSON.stringify({ userId: target.value.trim() });

      fetch('http://localhost:8080/v1/user/getUser', {
        method: 'POST',
        headers: myHeaders,
        body: requestObj,
        redirect: 'follow',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message == 'user is already exits') {
            setIsUserNameValid(false);
          } else {
            setIsUserNameValid(true);
          }
        })
        .catch(() => {
          addToast('something went wrong', 'error');
        });
    } else if (target.name == 'userName') {
      setIsUserNameValid(false);
    }

    setFormData({
      ...formData,
      [target.name]: target.value.trim(),
    });
  };

  const submitData = (event: React.MouseEvent<MouseEvent>) => {
    event.preventDefault();

    if (formData.password == '') {
      addToast('plase create a password', 'error');
      return;
    } else if (formData.password.length < 8) {
      addToast('password should be more than 8 digits', 'error');
      return;
    } else if (formData.password !== formData.confirmPassword) {
      addToast('confirm password is not matching with password', 'error');
      return;
    }

    setLoading(true);
    window.Telegram.Login.auth({ bot_id: 7291307734 }, (user: telegramData) => {
      const requestObj = JSON.stringify({ userId: formData.userName });

      fetch('http://localhost:8080/v1/user/signup', {
        method: 'POST',
        headers: myHeaders,
        body: requestObj,
        redirect: 'follow',
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // <Navigate to='/login' />
          console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      console.log(user);
    });
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
          <h2>Sign Up</h2>
          <div className='flex column align-start'>
            <form>
              <input
                className='input'
                type='text'
                placeholder='Create User Name'
                name='userName'
                value={formData.userName}
                onChange={handleInputChange}
              />
              {!isUserNameValid && formData.userName.length > 6 ? (
                <p className='error__message'>username is not avaiable</p>
              ) : (
                ''
              )}
              <input
                className='input'
                type='password'
                placeholder='Create Password'
                name='password'
                autoComplete='true'
                value={formData.password}
                onChange={handleInputChange}
              />
              <input
                className='input'
                type='password'
                placeholder='Confirm Password'
                name='confirmPassword'
                autoComplete='true'
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <Button
                value='Sign Up'
                clickEvent={submitData}
                loading={loading}
                disabled={isUserNameValid}
              />
            </form>
            <div style={{ display: 'none' }}>
              <LoginButton botUsername='TaskTether_bot' widgetVersion={22} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
