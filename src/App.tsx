import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoutes from './utils/ProtectedRoutes';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ToasterProvider from './contexts/ToasterContext';

function App() {
  return (
    <div className='container'>
      <ToasterProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route element={<></>} path='/' />
            </Route>
            <Route element={<SignUpPage />} path='/signup' />
            <Route element={<LoginPage />} path='/login' />
          </Routes>
        </BrowserRouter>
      </ToasterProvider>
    </div>
  );
}

export default App;
