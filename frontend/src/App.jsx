import InitialLoader from './components/Loader/InitialLoader'
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import './App.css'
import LadingPage from './pages/LandingPage/LadingPage';
import Loader from './routes/Loader';
import NotFound from './pages/404Page/NotFound';

const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const Register = lazy(() => import("./pages/RegisterAccount/Register"));

function App() {

  return (
    <>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Loader/>}> //main Router Loader
          <Route path='/' element={<LadingPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<Register/>} />


        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    </>
  )
}

export default App
