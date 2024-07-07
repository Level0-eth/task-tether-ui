import { LoginButton } from '@telegram-auth/react';

import './App.css';

function App() {
  return (
    <>
      <div>
        <h1>Login with Telegram</h1>
        <div id='telegram-login-container'>
          <LoginButton botUsername='TaskTether_bot' widgetVersion={22} />
        </div>
      </div>
    </>
  );
}

export default App;
