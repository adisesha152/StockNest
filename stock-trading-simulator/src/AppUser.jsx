import React from 'react'
import UserNav from './Components/UserNav'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Components/Dashboard'

const AppUser = () => {
  return (
    <div>
        <BrowserRouter>
        
        <UserNav/>
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AppUser