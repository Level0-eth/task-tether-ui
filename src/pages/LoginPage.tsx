import { LoginButton, TelegramAuthData } from '@telegram-auth/react';

import './loginpage.css';

import Logo from '../assets/logo.svg';

const LoginPage = () => {
  const handleTelegramLogin = (data: TelegramAuthData) => {
    console.log(data);
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
          <h2>Login Using Your Telegram Account</h2>
          <LoginButton
            botUsername='TaskTether_bot'
            widgetVersion={22}
            onAuthCallback={handleTelegramLogin}
            authCallbackUrl='/test'
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
