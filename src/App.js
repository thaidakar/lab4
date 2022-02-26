import React from 'react';
import Temperatures from './pages/temperatures';
import Profile from './pages/profile';
import Testing from './pages/automatedTesting';
import './App.css';
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="App-header">
        <div>
          <p>
            Welcome to Lab 4.
          </p>
          <div className='navigation-buttons'>
            <button className='event-button navigation-l' onClick={() => {navigate('/temperatures')}}>Temperatures</button>
            <button className='event-button navigation-r' onClick={() => {navigate('/profile')}}>Profile</button>
            <button className='event-button navigation-r' onClick={() => {navigate('/testing')}}>Testing</button>
          </div>
        </div>
        <Routes>
          <Route path="" element={<Navigate replace to="/temperatures"/>} />
          <Route path="temperatures" element={<Temperatures />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="testing" element={<Testing />}/>
        </Routes>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
