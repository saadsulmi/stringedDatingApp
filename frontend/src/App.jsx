import './App.css'
import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import UserPublicRoute from './routes/UserPublicRoute';
import Loader from './routes/Loader';
import LandingPage from './pages/LandingPage/LandingPage';
import UserPrivateRoute from './routes/UserPrivateRoute';
import AdminLogin from './pages/AdminPages/AdminLogin/AdminLogin';
import { socket } from './Socket';
import { SetOnlineUserData } from './features/users/OnlineUsers';
import { useDispatch, useSelector } from 'react-redux';


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



  const user = useSelector((state) => state.user.user);
  const auth = useSelector((state) => state.auth);
  const [call, setCall] = useState({
    modal: false,
  });
  const [loader, setLoader] = useState(true);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      socket.connect();
      socket.emit("add-user", user._id);
    }
  }, [user, pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("user id",user);
      socket.emit("getOnlineUsers", user._id);
      console.log('Emitting socket event every second');
    }, 5000); // 1000 milliseconds = 1 second

    return () => {
      // Clear the interval when the component unmounts to avoid memory leaks
      clearInterval(interval);
    };
  }, [user]);



  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 6000);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect_error", (error) => {
        console.log("Socket connect_error:", error);
      });

      socket.on("error", (error) => {
        console.log("Socket error:", error);
      });
     
      socket.on("onlineUsersList", (data) => {
        console.log(data,'<=from app');
        dispatch(SetOnlineUserData(data));
      });
    }
    return () => {
      socket.off("connect_error");
      socket.off("error");
    };
  }, []);

  



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
