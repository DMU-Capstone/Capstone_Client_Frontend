import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
// @ts-ignore
import MemberListScreen from './screens/Admin/MemberList.tsx'
import QueueList from './screens/Admin/QueueList.tsx'
import AdminMain from './screens/Admin/AdminMain.tsx'
import LoginPage from './config/adminLogin.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<AdminMain />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
//