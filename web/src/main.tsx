import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App'
// @ts-ignore
import MemberListScreen from './admin/screens/MemberList.tsx'
import QueueList from './admin/screens/QueueList'
import AdminMain from './admin/screens/AdminMain'
import LoginPage from './admin/config/adminLogin'
import GuestScreen from './user/UserScreen/GuestScreen'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './business/dashboard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<GuestScreen />}></Route>
      <Route path="/business" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
//