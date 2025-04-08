import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
// @ts-ignore
import MemberListScreen from './screens/Admin/MemberList.tsx'
import QueueList from './screens/Admin/QueueList.tsx'
import AdminMain from './screens/Admin/AdminMain.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminMain />}>
          <Route index element={<MemberListScreen />} />
          <Route path="/queue" element={<QueueList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
