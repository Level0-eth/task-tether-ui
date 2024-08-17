import './reset.css';
import './global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import ToasterProvider from './contexts/ToasterContext.tsx';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToasterProvider>
      <App />
    </ToasterProvider>
  </React.StrictMode>
);
