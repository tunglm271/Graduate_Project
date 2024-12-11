import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { MainLayout, AuthLayout } from './layouts' 
import { Home } from './pages/user';
import AppointmentPage from './pages/user/AppointmentPage';
import Login from './pages/auth/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/appoinments' element={<AppointmentPage />} />
          <Route path='/services' element={<div></div>} />
          <Route path='/health-profile' element={<div></div>} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
