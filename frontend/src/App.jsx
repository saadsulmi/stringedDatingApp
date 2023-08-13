import './App.css'
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import UserPublicRoute from './routes/UserPublicRoute';
import Loader from './routes/Loader';
import LandingPage from './pages/LandingPage/LandingPage';


const OtpRoute = lazy(()=>import ('./routes/OtpRoute'))
const RegisterRoute = lazy(()=>import ('./routes/RegisterRoute'))
const NotFound =lazy(()=> import('./pages/404Page/NotFound'))
const OtpPage =lazy(()=> import('./pages/Otp/OtpPage'))
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const Register = lazy(() => import("./pages/RegisterAccount/Register"));
const MobileLogin = lazy(()=>import('./pages/MobilePage/MobileLogin'))
const CreateAccount = lazy(() => import("./pages/CreateAccount/CreateAccount"));
const RegisterPage = lazy(()=>import('./pages/RegisterAccount/DataRegister'))

function App() {

  return (
    <>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Loader/>}> //main Router Loader
        <Route element={<UserPublicRoute/>}>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<Register/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/mobile' element={<MobileLogin/>} />
          <Route element={<OtpRoute/>}>
            <Route path='/otp' element={<OtpPage/>} />
          </Route>
          <Route element={<RegisterRoute />}>
                <Route path="/createAccount" element={<CreateAccount/>} />
          </Route>
          
        </Route>

        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    </>
  )
}

export default App
