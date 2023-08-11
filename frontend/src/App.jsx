import './App.css'
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import UserPublicRoute from './routes/UserPublicRoute';
import Loader from './routes/Loader';

const LadingPage = (()=>import ('./pages/LandingPage/LadingPage'))
const NotFound =lazy(()=> import('./pages/404Page/NotFound'))
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const Register = lazy(() => import("./pages/RegisterAccount/Register"));
const MobileLogin = lazy(()=>import('./pages/OTPpage/MobileLogin'))
const RegisterPage = lazy(()=>import('./pages/RegisterAccount/DataRegister'))

function App() {

  return (
    <>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Loader/>}> //main Router Loader
        <Route element={<UserPublicRoute/>}>
          <Route path='/' element={<LadingPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/mobileLogin' element={<MobileLogin/>} />
          <Route path='/signup' element={<Register/>} />
          <Route path='/register' element={<RegisterPage/>} />
        </Route>

        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    </>
  )
}

export default App
