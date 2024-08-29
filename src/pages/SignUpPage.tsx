import { ChangeEvent, useState } from 'react';
import { LoginButton } from '@telegram-auth/react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../components/ui/Button/Button';
import { useToaster } from '../hooks/useToaster';
import apiRequest from '../utils/apiRequest';

import Logo from '../assets/logo.svg';

interface SingUpData {
  userName: string;
  password: string;
  confirmPassword: string;
}

interface TelegramData {
  auth_date: number;
  first_name: string;
  hash: string;
  id: number;
  last_name: string;
  photo_url: string;
}

interface UserName {
  loading: boolean;
  valid: boolean;
}

const SignUpPage = () => {
  const [formData, setFormData] = useState<SingUpData>({
    userName: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [isUserNameValid, setIsUserNameValid] = useState<UserName>({
    loading: false,
    valid: false,
  });
  const addToast = useToaster();
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.name == 'userName' && target.value.trim().length > 5) {
      validateUserName(target);
    } else if (target.name == 'userName') {
      setIsUserNameValid(() => {
        return { loading: false, valid: false };
      });
    }

    setFormData({
      ...formData,
      [target.name]: target.value.trim(),
    });
  };

  const validateUserName = async (target: HTMLInputElement) => {
    const requestObj = { userId: target.value.trim() };

    setIsUserNameValid({ loading: true, valid: false });

    try {
      const data = await apiRequest(
        'http://localhost:8080/v1/user/getUser',
        requestObj
      );

      if (data.message == 'user not found') {
        setIsUserNameValid({ loading: false, valid: true });
      } else {
        setIsUserNameValid({ loading: false, valid: false });
      }
    } catch {
      setIsUserNameValid({ loading: false, valid: false });
      addToast('Something Went Wrong', 'error');
    }
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

    window.Telegram.Login.auth(
      { bot_id: 7291307734 },
      async (user: TelegramData) => {
        const requestObj = {
          userId: formData.userName,
          name: user.first_name,
          lastName: user.last_name,
          photoUrl: user.photo_url,
          authDate: user.auth_date,
          chatID: user.id,
          password: formData.password,
        };

        try {
          console.log(requestObj);
          await apiRequest('/v1/user/signup', requestObj);

          addToast('Registration Completed', 'success');
          navigate('/login');
          setLoading(false);
        } catch {
          addToast('something went wrong', 'error');
          setLoading(false);
        }
      }
    );
  };

  const checkUserName = () => {
    if (isUserNameValid.loading) {
      return 'loading';
    } else if (isUserNameValid.valid) {
      return 'valid';
    } else if (formData.userName.length > 6) {
      return 'invalid';
    }

    return '';
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
              <div className={`input__wrapper ${checkUserName()}`}>
                <input
                  className='input'
                  type='text'
                  placeholder='Create User Name'
                  name='userName'
                  value={formData.userName}
                  onChange={handleInputChange}
                />
              </div>
              <div className='input__wrapper'>
                <input
                  className='input'
                  type='password'
                  placeholder='Create Password'
                  name='password'
                  autoComplete='true'
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className='input__wrapper'>
                <input
                  className='input'
                  type='password'
                  placeholder='Confirm Password'
                  name='confirmPassword'
                  autoComplete='true'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              <Button
                value='Sign Up Using Telegram'
                clickEvent={submitData}
                loading={loading}
                disabled={isUserNameValid.valid}
              />
              <p className='note'>
                Already have an account? <Link to='/login'>Login</Link>
              </p>
              <p className='note'>
                Please clear the cache to use different Telegram account.
              </p>
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
