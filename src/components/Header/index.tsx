import './header.css';

import Logo from '../../assets/logo.svg';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Header = ({ user }: any) => {
  return (
    <header className='header'>
      <div className='logo'>
        <img src={Logo} alt='' />
      </div>
      <div className='header__options'>
        <div className='input__wrapper search'>
          <input
            type='text'
            name=''
            id=''
            className='input search'
            placeholder='Search Task'
          />
        </div>
        <div className='profile'>
          <img src={user?.photoUrl} alt='' />
        </div>
      </div>
    </header>
  );
};

export default Header;
