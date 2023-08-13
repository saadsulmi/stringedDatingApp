import React from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode"
import { GoogleLogin } from '@react-oauth/google';

function Login() {

    const navigate = useNavigate()
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
            navigate('/register')
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

export default Login
