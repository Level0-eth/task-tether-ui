import { LoginButton } from '@telegram-auth/react';

import './loginpage.css';
import Logo from '../assets/logo.svg';

const LoginPage = () => {
  return (
    <div className='login'>
      <div className='logo bg__lines'>
        <div className='logo__inner'>
          <img src={Logo} alt='' />
        </div>
      </div>
      <div className='auth'>
        <div className='auth__innner'>
          <h2>Login Using Your Telegram Account</h2>
          <LoginButton botUsername='TaskTether_bot' widgetVersion={22} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
