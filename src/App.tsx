import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoutes from './utils/ProtectedRoutes';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route element={<></>} path='/' />
          </Route>
          <Route element={<SignUpPage />} path='/signup' />
          <Route element={<LoginPage />} path='/login' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
