import { ChangeEvent, useState } from 'react';
import { LoginButton } from '@telegram-auth/react';

import Button from '../components/ui/Button/Button';

import Logo from '../assets/logo.svg';

interface SingUpData {
  userName: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const [formData, setFormData] = useState<SingUpData>({
    userName: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement;

    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const submitData = (event: React.MouseEvent<MouseEvent>) => {
    event.preventDefault();

    if (formData.userName == '') {
      alert('plase create a user name');
      return;
    } else if (formData.userName.length < 3) {
      alert('user name should be more than 5 words');
      return;
    } else if (formData.password == '') {
      alert('plase create a password');
      return;
    } else if (formData.password.length < 8) {
      alert('password should be more than 8 digits');
      return;
    } else if (formData.password !== formData.confirmPassword) {
      alert('confirm password is not matching with password');
      return;
    }

    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestObj = JSON.stringify({ userId: formData.userName });

    fetch('http://localhost:8080/v1/user/getUser', {
      method: 'POST',
      headers: myHeaders,
      body: requestObj,
      redirect: 'follow',
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);

        if (data.message == 'user is already exits') {
          alert('User name already present! please choose different user name');
        } else if (window.Telegram) {
          window.Telegram.Login.auth({ bot_id: 7291307734 }, () => {
            console.log('test');
          });
        }
      })
      .catch(() => {
        setLoading(false);
        alert('error');
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
