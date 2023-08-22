import './App.css'
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import UserPublicRoute from './routes/UserPublicRoute';
import Loader from './routes/Loader';
import LandingPage from './pages/LandingPage/LandingPage';
import UserPrivateRoute from './routes/UserPrivateRoute';
import AdminLogin from './pages/AdminPages/AdminLogin/AdminLogin';



// admin section




// user section

const OtpRoute = lazy(()=>import ('./routes/OtpRoute'))
const RegisterRoute = lazy(()=>import ('./routes/RegisterRoute'))
const NotFound =lazy(()=> import('./pages/404Page/NotFound'))
const HomePage =lazy(()=> import('./pages/HomePage/HomePage'))
const OtpPage =lazy(()=> import('./pages/Otp/OtpPage'))
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const Register = lazy(() => import("./pages/RegisterAccount/Register"));
const MobileLogin = lazy(()=>import('./pages/MobilePage/MobileLogin'))
const CreateAccount = lazy(() => import("./pages/CreateAccount/CreateAccount"));
const RegisterPage = lazy(()=>import('./pages/RegisterAccount/DataRegister'))
const Profile = lazy(() => import("./pages/ProfilePgae/Profile"));
const ChatPage = lazy(() => import("./pages/ChatPage/ChatPage"));
const MatchesPage = lazy(() => import("./pages/Matches/MatchesPage"));
const LikedUsersPage = lazy(() =>import("./pages/LikedUsersPage/LikedUsersPage"));


function App() {

  return (
    <>
    <Suspense fallback={<Loader />}>
      <Routes path='/'>
        <Route element={<Loader/>}> //main Router Loader
        <Route element={<UserPublicRoute/>}>
          <Route index element={<LandingPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<Register/>} />
          <Route path='/mobile' element={<MobileLogin/>} />
          <Route element={<OtpRoute/>}>
            <Route path='/otp' element={<OtpPage/>} />
          </Route>
          <Route element={<RegisterRoute />}>
                <Route path="/createAccount" element={<CreateAccount/>} />
          </Route>
        </Route>
        <Route element={<UserPrivateRoute/>}>
          <Route path="/Discover" element={<HomePage/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/LikedUsers" element={<LikedUsersPage />} />
          <Route path="/Matches" element={<MatchesPage />} />
          <Route path="/Chat" element={<ChatPage />} />
        </Route>

        </Route>
        <Route path="/admin">
          <Route index element={<AdminLogin/>}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    </>
  )
}

export default App
