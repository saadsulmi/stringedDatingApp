import InitialLoader from './components/Loader/InitialLoader'
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import './App.css'
import LadingPage from './pages/LandingPage/LadingPage';
import Loader from './routes/Loader';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {

  return (
    <>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Loader/>}> //main Router Loader
          <Route path='/' element={<LadingPage/>} />
          <Route path='/login' element={<LoginPage/>} />

        </Route>
      </Routes>
    </Suspense>
    </>
  )
}

export default App
