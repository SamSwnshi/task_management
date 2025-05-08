import React from 'react'

import { ToastContainer } from 'react-toastify';
import { BrowserRouter  as Router, Routes, Route } from "react-router-dom"
import Login from './Component/Login';
import Register from './Component/Register';
import Dashboard from './Component/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <ToastContainer position='top-center' autoClose={2000}/>
    </Router>
  )
}

export default App
