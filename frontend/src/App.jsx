import { useState } from 'react'
import InitialLoader from './components/Loader/InitialLoader'
import { Routes, Route } from "react-router-dom";
import './App.css'
import LadingPage from './pages/LandingPage/LadingPage';

function App() {

  return (
    <>
    <Routes>
      <Route path='/'>
        <Route index element={<LadingPage/>} />

      </Route>
    </Routes>
    </>
  )
}

export default App
