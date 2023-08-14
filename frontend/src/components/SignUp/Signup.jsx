import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode"
import { SetGoogleUserData } from '../../features/users/GoogleReducer';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { googleLoginAPI } from '../../services/api';
import { Auth_user } from '../../features/users/AuthReducer';
import { SetUser } from '../../features/users/RegisterReducer';

function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false)
  const [googleData,setGoogleData]=useState(null)
 
  useEffect(()=>{
    if(googleData){
      console.log(googleData);
      googleLoginAPI(googleData).then((res) => {
        console.log('waiting for res');
        console.log(res.data);
        setLoading(false);
        if (res.data.success) {
          if (res.data.newUser) {
            dispatch(SetUser());
            dispatch(SetGoogleUserData(googleData))
            navigate(res.data.redirect);
          } else {
            localStorage.setItem(
              "authorization.user",
              JSON.stringify(res.data.token)
              );
              dispatch(Auth_user());
              
              navigate(res.data.redirect);
            }
          } else {
            setError(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },[googleData])
  return (
    <div className='signupBlock'>
      <h3>Welcome! Please create an account !</h3>
      <GoogleLogin

        type='standard'
        theme='filled_black'
        width={100}
        padding={0}
        shape='pill'
        text='signup_with'
        size='large'

        useOneTap
          onSuccess={credentialResponse => {
            let decoded=jwt_decode(credentialResponse.credential);
            console.log(decoded);
            if(decoded.email_verified){
              setGoogleData({
                fullName : decoded.name,
                email: decoded.email,
              })
            }else{
              console.log("email not verified");
              navigate('/')
            }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />

      <div className='breakSection'>
      <hr />
      <h6>or</h6>
      <hr/>
      </div>
      <h4 onClick={()=>navigate('/mobile')}>use mobile number</h4>

    </div>
  )
}

export default SignUp
